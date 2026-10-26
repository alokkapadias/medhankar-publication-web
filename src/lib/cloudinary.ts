// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Cloudinary Media Upload Service (Unsigned Client Direct Upload)
// ==============================================================================

export const CLOUDINARY_CONFIG = {
  cloudName: 'tqachgfb',
  uploadPreset: 'Medhankar Assets Upload',
  uploadUrl: 'https://api.cloudinary.com/v1_1/tqachgfb/image/upload',
  folder: 'medhankar/assets',
};

export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

/**
 * Uploads an image file directly to Cloudinary using the configured unsigned preset.
 * Returns the HTTPS secure URL to be stored in Firebase Firestore.
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file (PNG, JPG, WebP, SVG).');
  }

  // Max 15MB size check
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Image size exceeds 15MB limit. Please choose a smaller image.');
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    // Track real-time upload percentage
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response: CloudinaryUploadResponse = JSON.parse(xhr.responseText);
          if (response.secure_url) {
            resolve(response.secure_url);
          } else {
            reject(new Error('Cloudinary response missing secure_url.'));
          }
        } catch {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          const errorMsg = errData?.error?.message || `Upload failed with HTTP ${xhr.status}`;
          reject(new Error(errorMsg));
        } catch {
          reject(new Error(`Cloudinary upload failed (HTTP ${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary image upload.'));
    };

    xhr.send(formData);
  });
}
