"use client";

import { useState, useRef, useCallback } from "react";
import { ComponentLibrary } from "@/components/page-builder/component-library";
import { Canvas } from "@/components/page-builder/canvas";
import { SettingsPanel } from "@/components/page-builder/settings-panel";
import { Toolbar } from "@/components/page-builder/toolbar";
import { usePageBuilderStore } from "@/stores/page-builder-store";
import { ComponentData, ComponentType } from "@/types/page-builder";

export default function PageBuilder() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Generate unique ID for components
  const generateId = () => `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const {
    components,
    addComponent,
    updateComponent,
    removeComponent,
    saveLayout,
    clearLayout
  } = usePageBuilderStore();

  const handleDrop = useCallback((componentType: ComponentType, position: { x: number; y: number; parentId?: string | null }) => {
    const newComponent: ComponentData = {
      id: generateId(),
      type: componentType,
      position: { x: position.x, y: position.y },
      props: getDefaultProps(componentType),
      style: getDefaultStyle(componentType),
      parentId: position.parentId || null
    };
    
    addComponent(newComponent);
    setSelectedComponent(newComponent);
  }, [addComponent]);

  const handleComponentSelect = (component: ComponentData | null) => {
    setSelectedComponent(component);
  };

  const handleComponentUpdate = (componentId: string, updates: Partial<ComponentData>) => {
    updateComponent(componentId, updates);
    if (selectedComponent?.id === componentId) {
      setSelectedComponent({ ...selectedComponent, ...updates });
    }
  };

  const handleComponentDelete = (componentId: string) => {
    removeComponent(componentId);
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
  };

  const handleSave = () => {
    saveLayout();
    // Show success message
    alert("Layout saved successfully!");
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the entire layout?")) {
      clearLayout();
      setSelectedComponent(null);
    }
  };

  const handlePreview = () => {
    // Save current layout and open preview
    saveLayout();
    window.open('/agent/page-builder/preview', '_blank');
  };

  const getDefaultProps = (type: ComponentType): Record<string, string> => {
    switch (type) {
      case 'container-1col':
        return {
          title: 'Single Column Section',
          content: 'Drop your content here'
        };
      case 'container-2col':
        return {
          title: 'Two Column Section',
          col1Content: 'Left column content',
          col2Content: 'Right column content'
        };
      default:
        return {};
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <Toolbar
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        zoom={zoom}
        onZoomIn={() => setZoom(prev => Math.min(prev + 25, 200))}
        onZoomOut={() => setZoom(prev => Math.max(prev - 25, 25))}
        onZoomReset={() => setZoom(100)}
        onSave={handleSave}
        onClear={handleClear}
        onPreview={handlePreview}
        onUndo={() => {}}
        onRedo={() => {}}
        canUndo={false}
        canRedo={false}
        savedLayouts={[]}
        onLoadLayout={() => {}}
      />

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Library Sidebar */}
        <ComponentLibrary />

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 p-4">
          <Canvas
            ref={canvasRef}
            components={components}
            showGrid={showGrid}
            zoom={zoom}
            onDrop={handleDrop}
            onComponentSelect={handleComponentSelect}
            onComponentUpdate={handleComponentUpdate}
            onComponentDelete={handleComponentDelete}
            selectedComponent={selectedComponent}
          />
        </div>

        {/* Settings Panel */}
        {selectedComponent && (
          <SettingsPanel
            component={selectedComponent}
            onUpdate={handleComponentUpdate}
            onDelete={handleComponentDelete}
            onClose={() => setSelectedComponent(null)}
          />
        )}
      </div>
    </div>
  );
}

// Helper functions for default component properties and styles
function getDefaultStyle(type: ComponentType): Record<string, string> {
  switch (type) {
    case 'container-1col':
      return { backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
    case 'container-2col':
      return { backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
    default:
      return {};
  }
} 