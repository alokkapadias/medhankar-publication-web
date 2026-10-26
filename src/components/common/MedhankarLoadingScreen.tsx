// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Official Opening Screen Animation (Powered by Lottie-Web)
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web/build/player/lottie_light';

interface MedhankarLoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // Duration in ms before smooth exit (default 2400ms)
}

export const MedhankarLoadingScreen: React.FC<MedhankarLoadingScreenProps> = ({
  onComplete,
  minDuration = 2400,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animInstance: AnimationItem | null = null;

    if (animationContainerRef.current) {
      animInstance = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/medhankar-loading.json',
      });
    }

    // Trigger smooth fade out transition after minDuration
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(hideTimer);
    }, minDuration);

    return () => {
      clearTimeout(exitTimer);
      if (animInstance) {
        animInstance.destroy();
      }
    };
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`medhankar-loading-root ${isExiting ? 'is-exiting' : ''}`}
      aria-label="Loading Medhankar Publication"
      role="status"
    >
      <div className="medhankar-loading-stage">
        {/* Lottie Animation Display */}
        <div ref={animationContainerRef} className="medhankar-lottie-canvas" />
      </div>

      <style>{`
        .medhankar-loading-root {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          background: #FFFFFF;
          background: radial-gradient(circle at center, #F8FAFC 0%, #EFF6FF 45%, #FFFFFF 85%);
          z-index: 99999999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transform: scale(1);
          filter: blur(0px);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: auto;
          overflow: hidden;
          user-select: none;
        }

        .medhankar-loading-root.is-exiting {
          opacity: 0;
          transform: scale(1.04);
          filter: blur(6px);
          pointer-events: none;
        }

        .medhankar-loading-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: medhankarStageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes medhankarStageFadeIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .medhankar-lottie-canvas {
          width: clamp(220px, 48vw, 320px);
          height: clamp(220px, 48vw, 320px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .medhankar-lottie-canvas svg {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
      `}</style>
    </div>
  );
};
