"use client";

import React, { forwardRef, useState, useCallback, useRef } from "react";
import { ComponentData, ComponentType } from "@/types/page-builder";
import { CanvasComponent } from "./canvas-component";
import { Grid } from "./grid";

interface CanvasProps {
  components: ComponentData[];
  showGrid: boolean;
  zoom: number;
  onDrop: (componentType: ComponentType, position: { x: number; y: number }) => void;
  onComponentSelect: (component: ComponentData | null) => void;
  onComponentUpdate: (componentId: string, updates: Partial<ComponentData>) => void;
  onComponentDelete: (componentId: string) => void;

  selectedComponent: ComponentData | null;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({
    components,
    showGrid,
    zoom,
    onDrop,
    onComponentSelect,
    onComponentUpdate,
    onComponentDelete,
    selectedComponent
  }, ref) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);
    
    // Website page dimensions and grid settings
    const pageWidth = 1200; // Standard desktop width
    const pageHeight = 800; // Minimum page height
    const gridSize = 20; // Grid cell size
    const gridRows = Math.floor(pageHeight / gridSize); // Number of grid rows

    // Helper function to find the best grid position for a new component
    const findBestGridPosition = useCallback((componentType: ComponentType, dropX: number, dropY: number) => {
      // Get component dimensions based on type
      const getComponentDimensions = (type: ComponentType) => {
        switch (type) {
          case 'container-1col':
            return { width: 60, height: 10 }; // Full width (1200px / 20px grid)
          case 'container-2col':
            return { width: 60, height: 10 }; // Full width (1200px / 20px grid)
          default:
            return { width: 60, height: 10 }; // Default to full width
        }
      };

      const dimensions = getComponentDimensions(componentType);
      const gridHeight = Math.ceil(dimensions.height);

      // Check if dropping inside an existing layout component
      const findParentContainer = (dropX: number, dropY: number) => {
        return components.find(component => {
          if (component.type !== 'container-1col' && component.type !== 'container-2col') {
            return false;
          }
          
          const compX = Math.floor(component.position.x / gridSize);
          const compY = Math.floor(component.position.y / gridSize);
          const compWidth = 60; // Full width for layout components
          const compHeight = 10; // Standard height for layout components
          
          // Check if drop position is within this container
          return dropX >= compX && dropX < compX + compWidth &&
                 dropY >= compY && dropY < compY + compHeight;
        });
      };

      const parentContainer = findParentContainer(
        Math.floor(dropX / gridSize),
        Math.floor(dropY / gridSize)
      );

      if (parentContainer) {
        // Place component inside the parent container
        const parentX = Math.floor(parentContainer.position.x / gridSize);
        const parentY = Math.floor(parentContainer.position.y / gridSize);
        
        // Find the next available position inside the parent
        let nestedY = parentY + 1; // Start below the parent title
        
        // Check for other nested components in this parent
        const nestedComponents = components.filter(comp => 
          comp.parentId === parentContainer.id
        );
        
        if (nestedComponents.length > 0) {
          // Find the lowest nested component
          nestedComponents.forEach(comp => {
            const compGridY = Math.floor(comp.position.y / gridSize);
            const compHeight = Math.ceil(getComponentDimensions(comp.type).height);
            const compBottomY = compGridY + compHeight;
            nestedY = Math.max(nestedY, compBottomY);
          });
          
          // Add gap between nested components
          nestedY += 1;
        }
        
        // Ensure nested component fits within parent bounds
        if (nestedY + gridHeight > parentY + 10) { // Parent height is 10 grid cells
          nestedY = parentY + 10 - gridHeight;
        }
        
        return {
          x: (parentX + 1) * gridSize, // Indent inside parent
          y: nestedY * gridSize,
          parentId: parentContainer.id // Mark as nested
        };
      } else {
        // Place component at page level (not nested)
        const centerX = 0; // Start from left edge for full width
        const clampedCenterX = Math.max(0, centerX);

        // Find the bottom position by checking existing page-level components
        let bottomY = 0;
        
        const pageLevelComponents = components.filter(comp => !comp.parentId);
        
        if (pageLevelComponents.length > 0) {
          // Find the lowest page-level component position
          pageLevelComponents.forEach(component => {
            const compDimensions = getComponentDimensions(component.type);
            const compGridHeight = Math.ceil(compDimensions.height);
            const compBottomY = Math.floor(component.position.y / gridSize) + compGridHeight;
            bottomY = Math.max(bottomY, compBottomY);
          });
          
          // Add a small gap between components (1 grid cell)
          bottomY += 1;
        }

        // Ensure the new component fits within page bounds
        if (bottomY + gridHeight > gridRows) {
          // If it doesn't fit, place it at the very bottom and extend page height
          bottomY = gridRows;
        }

        return { 
          x: clampedCenterX * gridSize, 
          y: bottomY * gridSize,
          parentId: null // Mark as page-level
        };
      }
    }, [components, gridSize, gridRows]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
      
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / (zoom / 100);
        const y = (e.clientY - rect.top) / (zoom / 100);
        setDragPosition({ x, y });
      }
    }, [zoom]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const componentType = e.dataTransfer.getData('componentType') as ComponentType;
      if (componentType && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / (zoom / 100);
        const y = (e.clientY - rect.top) / (zoom / 100);
        
        // Find the best grid position that prevents overlap
        const bestPosition = findBestGridPosition(componentType, x, y);
        onDrop(componentType, bestPosition);
      }
    }, [onDrop, zoom, findBestGridPosition]);

    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
      // Deselect component if clicking on empty canvas
      if (e.target === e.currentTarget) {
        onComponentSelect(null);
      }
    }, [onComponentSelect]);

    const handleComponentClick = useCallback((e: React.MouseEvent, component: ComponentData) => {
      e.stopPropagation();
      onComponentSelect(component);
    }, [onComponentSelect]);

    const handleComponentUpdate = useCallback((componentId: string, updates: Partial<ComponentData>) => {
      onComponentUpdate(componentId, updates);
    }, [onComponentUpdate]);

    const handleComponentDelete = useCallback((componentId: string) => {
      onComponentDelete(componentId);
    }, [onComponentDelete]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (selectedComponent) {
        switch (e.key) {
          case 'Delete':
          case 'Backspace':
            e.preventDefault();
            handleComponentDelete(selectedComponent.id);
            break;
          case 'Escape':
            onComponentSelect(null);
            break;
        }
      }
    }, [selectedComponent, handleComponentDelete, onComponentSelect]);

    // Add keyboard event listener
    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-auto"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left'
        }}
      >
        {/* Canvas Container with Page Dimensions */}
        <div
          ref={canvasRef}
          className="relative mx-auto bg-white dark:bg-gray-900 shadow-xl"
          style={{
            width: pageWidth,
            minHeight: pageHeight,
            margin: '20px auto'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleCanvasClick}
        >
          {/* Grid Background */}
          {showGrid && <Grid />}
          
          {/* Page Border Indicator */}
          <div className="absolute inset-0 border-2 border-gray-300 dark:border-gray-600 pointer-events-none">
            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
              {pageWidth}px × {pageHeight}px
            </div>
            <div className="absolute top-0 right-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-bl">
              Grid: {gridSize}px
            </div>
          </div>
          
          {/* Drag Overlay */}
          {isDragOver && (
            <div
              className="absolute pointer-events-none z-10 border-2 border-dashed border-blue-500 bg-blue-50 bg-opacity-50 rounded-lg"
              style={{
                left: dragPosition.x,
                top: dragPosition.y,
                width: 200,
                height: 100
              }}
            >
              <div className="flex items-center justify-center h-full text-blue-600 font-medium">
                Drop component here
              </div>
            </div>
          )}
          
          {/* Components */}
          {components.map((component, index) => (
            <CanvasComponent
              key={component.id}
              component={component}
              isSelected={selectedComponent?.id === component.id}
              onClick={(e: React.MouseEvent) => handleComponentClick(e, component)}
              onUpdate={handleComponentUpdate}
              onDelete={handleComponentDelete}
              zIndex={index}
              pageWidth={pageWidth}
              gridSize={gridSize}
            />
          ))}
          
          {/* Empty State */}
          {components.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Start Building Your Website
                </h3>
                <p className="text-sm">Drag components from the sidebar to get started</p>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Page Width: {pageWidth}px</p>
                  <p>Page Height: {pageHeight}px (minimum)</p>
                  <p>Grid Size: {gridSize}px</p>
                  <p className="text-blue-500 font-medium">Components will stack vertically without overlap</p>
                  <p className="text-green-500 font-medium">All components inherit full width (1200px)</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Stacking Guide */}
          {components.length > 0 && (
            <div className="absolute top-4 left-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span className="font-medium">Nested Layout Builder</span>
              </div>
              <p>• Components automatically stack below each other</p>
              <p>• Drop inside containers to create nested layouts</p>
              <p>• All components inherit full page width (1200px)</p>
              <p>• Available: 1 Column & 2 Column Containers</p>
              <p className="text-blue-600 font-medium">💡 Tip: Drop components inside containers to nest them</p>
            </div>
          )}
        </div>
        
        {/* Canvas Info */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-xs text-gray-600 dark:text-gray-400">
          <div>Zoom: {zoom}%</div>
          <div>Layout Components: {components.length}</div>
          <div>Page: {pageWidth}×{pageHeight}px</div>
          <div>Grid: {gridSize}px</div>
        </div>
      </div>
    );
  }
);

Canvas.displayName = "Canvas"; 