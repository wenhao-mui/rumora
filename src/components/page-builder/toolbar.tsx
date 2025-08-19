"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ZoomIn, 
  ZoomOut, 
  Grid3X3, 
  Save, 
  RotateCcw, 
  Eye, 
  Download, 
  Upload,
  Undo2,
  Redo2,
  Settings,
  ChevronDown
} from "lucide-react";

interface ToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  onSave: () => void;
  onClear: () => void;
  onPreview: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  savedLayouts: Array<{ id: string; name: string; timestamp: string }>;
  onLoadLayout: (layoutId: string) => void;
}

export function Toolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  showGrid,
  onToggleGrid,
  onSave,
  onClear,
  onPreview,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  savedLayouts,
  onLoadLayout
}: ToolbarProps) {
  const [showLoadDropdown, setShowLoadDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLoadDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left Section - Zoom Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onZoomOut}
          disabled={zoom <= 25}
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Badge variant="secondary" className="min-w-[60px] text-center">
          {zoom}%
        </Badge>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onZoomIn}
          disabled={zoom >= 200}
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomReset}
          className="h-8 px-2 text-xs"
        >
          Reset
        </Button>
      </div>

      {/* Center Section - Grid Toggle */}
      <div className="flex items-center space-x-2">
        <Button
          variant={showGrid ? "default" : "outline"}
          size="sm"
          onClick={onToggleGrid}
          className="h-8 px-3"
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          Grid
        </Button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-2">
        {/* Undo/Redo */}
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-8 w-8 p-0"
          title="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="h-8 w-8 p-0"
          title="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Load Layout Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLoadDropdown(!showLoadDropdown)}
            className="h-8 px-3"
            disabled={savedLayouts.length === 0}
          >
            <Upload className="h-4 w-4 mr-2" />
            Load
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          
          {showLoadDropdown && savedLayouts.length > 0 && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-2">
                  Saved Layouts
                </div>
                {savedLayouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => {
                      onLoadLayout(layout.id);
                      setShowLoadDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <div className="font-medium">{layout.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(layout.timestamp)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="h-8 px-3"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>

        {/* Clear */}
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="h-8 px-3"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Preview */}
        <Button
          size="sm"
          onClick={onPreview}
          className="h-8 px-3"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>
    </div>
  );
} 