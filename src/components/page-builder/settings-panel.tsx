"use client";

import React, { useState } from "react";
import { ComponentData } from "@/types/page-builder";
import { X, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SettingsPanelProps {
  component: ComponentData;
  onUpdate: (componentId: string, updates: Partial<ComponentData>) => void;
  onDelete: (componentId: string) => void;
  onClose: () => void;
}

export function SettingsPanel({
  component,
  onUpdate,
  onDelete,
  onClose
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');

  const handlePropertyChange = (key: string, value: string) => {
    onUpdate(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handleStyleChange = (key: string, value: string | number) => {
    onUpdate(component.id, {
      style: { ...component.style, [key]: value }
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${component.type} component?`)) {
      onDelete(component.id);
      onClose();
    }
  };

  const renderContentFields = () => {
    if (!component) return null;

    switch (component.type) {
      case 'container-1col':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={String(component.props.title || '')}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={String(component.props.content || '')}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter content"
              />
            </div>
          </div>
        );

      case 'container-2col':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={String(component.props.title || '')}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Column 1 Content
              </label>
              <textarea
                value={String(component.props.col1Content || '')}
                onChange={(e) => handlePropertyChange('col1Content', e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter column 1 content"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Column 2 Content
              </label>
              <textarea
                value={String(component.props.col2Content || '')}
                onChange={(e) => handlePropertyChange('col2Content', e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter column 2 content"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 text-center py-4">
            No content fields available for this component type.
          </div>
        );
    }
  };

  const renderStyleTab = () => {
    const { style } = component;
    
    return (
      <div className="space-y-4">
        {/* Text Styles */}
        <div>
          <Label>Text Color</Label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={style.color || '#000000'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-10 h-10 border rounded cursor-pointer"
            />
            <Input
              value={style.color || '#000000'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              placeholder="#000000"
            />
          </div>
        </div>
        
        <div>
          <Label>Font Size</Label>
          <Input
            type="text"
            value={style.fontSize || '16px'}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            placeholder="16px"
          />
        </div>
        
        <div>
          <Label>Text Align</Label>
          <select
            value={style.textAlign || 'left'}
            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
        
        {/* Background */}
        <div>
          <Label>Background Color</Label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-10 h-10 border rounded cursor-pointer"
            />
            <Input
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              placeholder="#ffffff"
            />
          </div>
        </div>
        
        {/* Spacing */}
        <div>
          <Label>Padding</Label>
          <Input
            type="text"
            value={style.padding || '0px'}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            placeholder="20px"
          />
        </div>
        
        <div>
          <Label>Border Radius</Label>
          <Input
            type="text"
            value={style.borderRadius || '0px'}
            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            placeholder="8px"
          />
        </div>
      </div>
    );
  };

  const renderLayoutTab = () => {
    const { position, size } = component;
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Position X (px)</Label>
          <Input
            type="number"
            value={position.x}
            onChange={(e) => onUpdate(component.id, {
              position: { ...position, x: parseInt(e.target.value) || 0 }
            })}
          />
        </div>
        
        <div>
          <Label>Position Y (px)</Label>
          <Input
            type="number"
            value={position.y}
            onChange={(e) => onUpdate(component.id, {
              position: { ...position, y: parseInt(e.target.value) || 0 }
            })}
          />
        </div>
        
        {size && (
          <>
            <div>
              <Label>Width (px)</Label>
              <Input
                type="number"
                value={size.width}
                onChange={(e) => onUpdate(component.id, {
                  size: { ...size, width: parseInt(e.target.value) || 100 }
                })}
              />
            </div>
            
            <div>
              <Label>Height (px)</Label>
              <Input
                type="number"
                value={size.height}
                onChange={(e) => onUpdate(component.id, {
                  size: { ...size, height: parseInt(e.target.value) || 100 }
                })}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Settings
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize your component properties and appearance
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'content'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Type className="h-4 w-4 inline mr-2" />
          Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'style'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Palette className="h-4 w-4 inline mr-2" />
          Style
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'layout'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
                          <Type className="h-4 w-4 inline mr-2" />
          Layout
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && renderContentFields()}
        {activeTab === 'style' && renderStyleTab()}
        {activeTab === 'layout' && renderLayoutTab()}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <Button
          onClick={handleDelete}
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Delete Component
        </Button>
      </div>
    </div>
  );
} 