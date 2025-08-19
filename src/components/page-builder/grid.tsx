"use client";

export function Grid() {
  const gridSize = 20;
  const gridColor = '#e5e7eb';
  const gridOpacity = 0.3;

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridColor} ${gridOpacity}, transparent 1px),
          linear-gradient(to bottom, ${gridColor} ${gridOpacity}, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`
      }}
    />
  );
} 