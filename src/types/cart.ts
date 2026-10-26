// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Cart, Purchasing & Checkout Domain Models
// ==============================================================================

import type { BookFormat } from './index';

export type CoverFinish = 'matte' | 'glossy';

export interface CartItem {
  id: string; // unique key combining bookId, format, finish
  bookId: string;
  slug: string;
  title: string;
  subtitle?: string;
  authorName: string;
  coverImageUrl: string;
  format: BookFormat;
  formatLabel: string;
  coverFinish?: CoverFinish;
  dedication?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  isDigital: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
  deliveryInstructions?: string;
}

export type DeliveryMethodType = 'standard' | 'express' | 'digital';

export interface DeliveryMethod {
  id: DeliveryMethodType;
  title: string;
  estimate: string;
  fee: number;
  isDigital: boolean;
}

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'cod';

export interface CheckoutOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  shippingAddress?: ShippingAddress;
  deliveryMethod: DeliveryMethodType;
  deliveryFee: number;
  subtotal: number;
  discount: number;
  tax: number;
  finalTotal: number;
  paymentMethod: PaymentMethodType;
  status: 'pending' | 'processing' | 'confirmed' | 'failed';
  createdAt: string;
  userId?: string;
}

export interface BookEditionOption {
  format: BookFormat;
  label: string;
  price: number;
  available: boolean;
  description?: string;
  isDigital: boolean;
}
