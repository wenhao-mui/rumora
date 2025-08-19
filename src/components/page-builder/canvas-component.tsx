"use client";

import React, { useState, useRef, useCallback } from "react";
import { ComponentData, ComponentType } from "@/types/page-builder";
import { X, Move } from "lucide-react";

interface CanvasComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onUpdate: (componentId: string, updates: Partial<ComponentData>) => void;
  onDelete: (componentId: string) => void;
  zIndex: number;
  pageWidth: number;
  gridSize: number;
}

export function CanvasComponent({
  component,
  isSelected,
  onClick,
  onUpdate,
  onDelete,
  zIndex,
  pageWidth,
  gridSize
}: CanvasComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    
    const rect = componentRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !componentRef.current) return;

    const canvasRect = componentRef.current.parentElement?.getBoundingClientRect();
    if (canvasRect) {
      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;
      
      // Snap to grid
      const snappedX = Math.round(newX / gridSize) * gridSize;
      const snappedY = Math.round(newY / gridSize) * gridSize;
      
      // Ensure component stays within page bounds
      const clampedX = Math.max(0, Math.min(snappedX, pageWidth - 200));
      
      // For Y position, maintain vertical stacking - don't allow overlapping
      // Find the best Y position that doesn't overlap with other components
      const getComponentHeight = (type: ComponentType) => {
        switch (type) {
          case 'container-1col': return 10 * gridSize;
          case 'container-2col': return 10 * gridSize;
          default: return 10 * gridSize;
        }
      };
      
      const componentHeight = getComponentHeight(component.type);
      let bestY = snappedY;
      
      // Check if the new position would overlap with other components
      const checkOverlap = (y: number) => {
        const componentTop = y;
        const componentBottom = y + componentHeight;
        
        // Get all other components from the parent canvas
        const allComponents = Array.from(componentRef.current?.parentElement?.children || [])
          .filter(child => child !== componentRef.current && child.classList.contains('canvas-component'));
        
        return allComponents.some(otherComponent => {
          const otherRect = otherComponent.getBoundingClientRect();
          const otherTop = otherRect.top - canvasRect.top;
          const otherHeight = otherRect.height;
          const otherBottom = otherTop + otherHeight;
          
          // Check if there's overlap
          return !(componentBottom <= otherTop || otherBottom <= componentTop);
        });
      };
      
      // If there's overlap, find the next available position
      if (checkOverlap(bestY)) {
        // Find the lowest component position
        let lowestY = 0;
        const allComponents = Array.from(componentRef.current?.parentElement?.children || [])
          .filter(child => child !== componentRef.current && child.classList.contains('canvas-component'));
        
        allComponents.forEach(otherComponent => {
          const otherRect = otherComponent.getBoundingClientRect();
          const otherTop = otherRect.top - canvasRect.top;
          const otherHeight = otherRect.height;
          const otherBottom = otherTop + otherHeight;
          lowestY = Math.max(lowestY, otherBottom);
        });
        
        // Place at the bottom with a small gap
        bestY = lowestY + gridSize;
      }
      
      // Ensure Y position is within reasonable bounds
      bestY = Math.max(0, bestY);
      
      onUpdate(component.id, {
        position: { x: clampedX, y: bestY }
      });
    }
  }, [isDragging, dragOffset, component.id, component.type, onUpdate, pageWidth, gridSize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(component.id);
  }, [component.id, onDelete]);

  // Helper function to get component width based on type
  const getComponentWidth = () => {
    // All components now inherit full width from parent canvas
    return '100%';
  };

  // Helper function to get component max-width
  const getComponentMaxWidth = () => {
    // All components now use full width
    return '100%';
  };

  const renderComponent = () => {
    const { type, props, style } = component;
    const componentWidth = getComponentWidth();
    const componentMaxWidth = getComponentMaxWidth();
    
    // Merge component styles with full width inheritance
    const mergedStyle = {
      ...style,
      width: componentWidth,
      maxWidth: componentMaxWidth,
      margin: '0 auto', // Center components
    };
    
    switch (type) {
      case 'container-1col':
        return (
          <div style={mergedStyle} className="min-h-[200px] p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <h3 className="text-xl font-semibold mb-4 text-center">{props.title}</h3>
            <div className="bg-white dark:bg-gray-700 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
              <p className="text-gray-500 text-center">
                {props.content}<br />
                <span className="text-sm">Single Column Container - drop components here</span>
              </p>
            </div>
          </div>
        );
      
      case 'container-2col':
        return (
          <div style={mergedStyle} className="min-h-[200px] p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <h3 className="text-xl font-semibold mb-4 text-center">{props.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.col1Content}<br />
                  <span className="text-sm">Column 1</span>
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.col2Content}<br />
                  <span className="text-sm">Column 2</span>
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div style={mergedStyle} className="min-h-[50px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 rounded">
            Unknown component type: {type}
          </div>
        );
    }
  };

  return (
    <div
      ref={componentRef}
      className={`canvas-component absolute cursor-move select-none ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${component.parentId ? 'nested-component' : 'page-level-component'}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        zIndex: zIndex,
        width: getComponentWidth(),
        maxWidth: getComponentMaxWidth(),
        // Add visual indication for nested components
        ...(component.parentId && {
          borderLeft: '3px solid #3b82f6',
          marginLeft: '20px',
          opacity: 0.9,
          transform: 'scale(0.95)'
        })
      }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      {/* Component Content */}
      <div className="relative">
        {renderComponent()}
        
        {/* Nested Component Indicator */}
        {component.parentId && (
          <div className="absolute -left-6 top-0 bottom-0 flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        )}
        
        {/* Selection Overlay */}
        {isSelected && (
          <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none">
            {/* Resize Handles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
          </div>
        )}
        
        {/* Component Controls */}
        {isSelected && (
          <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            <Move className="w-3 h-3" />
            <span>Drag to move</span>
            {component.parentId && (
              <span className="ml-2 px-2 py-1 bg-blue-600 rounded text-xs">
                Nested
              </span>
            )}
            <button
              onClick={handleDelete}
              className="ml-2 hover:bg-red-500 p-1 rounded"
              title="Delete component"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 