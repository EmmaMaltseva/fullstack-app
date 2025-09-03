import React from 'react';

export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-white opacity-25 flex items-center justify-center pointer-events-auto">
      <div className="w-8 h-8 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
    </div>
  )
}