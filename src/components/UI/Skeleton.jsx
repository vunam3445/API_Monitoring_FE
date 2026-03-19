import React from 'react';

/**
 * Skeleton component for loading states
 * Provides a pulse animation for better UX during data fetching
 */
const Skeleton = ({ className = '', variant = 'text', width, height }) => {
  const baseClasses = "bg-slate-200 dark:bg-slate-800 animate-pulse";
  
  let variantClasses = "";
  switch (variant) {
    case 'circle':
      variantClasses = "rounded-full";
      break;
    case 'rect':
      variantClasses = "rounded-lg";
      break;
    case 'text':
    default:
      variantClasses = "rounded h-4 w-full";
      break;
  }

  const styles = {
    width: width || undefined,
    height: height || undefined
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      style={styles}
    />
  );
};

export default Skeleton;
