import React from "react";

export default function LoaderOverlay() {
  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-white opacity-25">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
    </div>
  );
}
