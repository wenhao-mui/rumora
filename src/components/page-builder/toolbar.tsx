"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Grid3X3, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Save, 
  Download, 
  Upload, 
  Eye,
  Trash2,
  Undo,
  Redo,
  ChevronDown
} from "lucide-react";
import { usePageBuilderStore } from "@/stores/page-builder-store";

interface ToolbarProps {
  showGrid: boolean;
  onToggleGrid: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onSave: () => void;
  onLoad?: () => void; // Made optional since toolbar handles loading internally
  onClear: () => void;
  onPreview: () => void;
}

export function Toolbar({
  showGrid,
  onToggleGrid,
  zoom,
  onZoomChange,
  onSave,
  onClear,
  onPreview
}: ToolbarProps) {
  const { canUndo, canRedo, undo, redo, exportLayout, importLayout, layouts, loadLayout } = usePageBuilderStore();
  const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLayoutDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 25, 25));
  };

  const handleZoomReset = () => {
    onZoomChange(100);
  };

  const handleExport = () => {
    const data = exportLayout();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rumora-layout-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (content) {
            importLayout(content);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLoadLayout = (layoutId: string) => {
    loadLayout(layoutId);
    setShowLayoutDropdown(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Grid & Zoom Controls */}
        <div className="flex items-center space-x-4">
          {/* Grid Toggle */}
          <Button
            variant={showGrid ? "default" : "outline"}
            size="sm"
            onClick={onToggleGrid}
            className="flex items-center space-x-2"
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 25}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomReset}
                className="h-6 px-2 text-xs"
              >
                Reset
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Center Section - History Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={!canUndo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={!canRedo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Import/Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleImport}
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          {/* Layout Actions */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Load</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {/* Layout Dropdown */}
            {showLayoutDropdown && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {layouts.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      <p>No saved layouts</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {layouts.map((layout) => (
                        <button
                          key={layout.id}
                          onClick={() => handleLoadLayout(layout.id)}
                          className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
                        >
                          <div className="font-medium">{layout.name}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(layout.updatedAt).toLocaleDateString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>

          {/* Preview */}
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span className="text-sm">Preview</span>
          </Button>

          {/* Clear */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        <span className="mr-4">Delete: Remove selected component</span>
        <span className="mr-4">Escape: Deselect component</span>
        <span className="mr-4">Ctrl+Z: Undo</span>
        <span>Ctrl+Y: Redo</span>
      </div>
    </div>
  );
} 