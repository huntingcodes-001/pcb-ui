import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Generating PCB design...</p>
    </div>
  );
}

export default LoadingSpinner;