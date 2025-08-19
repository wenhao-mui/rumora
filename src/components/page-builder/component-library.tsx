"use client";

import { useState } from "react";
import { 
  ArrowUpDown,
  Search,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { ComponentType, ComponentTemplate } from "@/types/page-builder";

const componentTemplates: ComponentTemplate[] = [
  {
    type: 'container-1col',
    name: '1 Column Container',
    description: 'Single column container for content',
    icon: '📄',
    category: 'layout',
    defaultProps: {
      title: 'Single Column Section',
      content: 'Drop your content here'
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      border: '2px dashed #d1d5db'
    }
  },
  {
    type: 'container-2col',
    name: '2 Column Container',
    description: 'Two column container for side-by-side content',
    icon: '📋',
    category: 'layout',
    defaultProps: {
      title: 'Two Column Section',
      col1Content: 'Left column content',
      col2Content: 'Right column content'
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      border: '2px dashed #d1d5db'
    }
  }
];

const categories = [
  { id: 'layout', name: 'Layout & Spacing', icon: ArrowUpDown }
];

export function ComponentLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['layout']);
  const [isDragging, setIsDragging] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDragStart = (e: React.DragEvent, componentType: ComponentType) => {
    setIsDragging(true);
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const filteredComponents = componentTemplates.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedComponents = categories.map(category => ({
    ...category,
    components: filteredComponents.filter(comp => comp.category === category.id)
  })).filter(group => group.components.length > 0);

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Layout Components
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Drag layout containers to build your page structure
        </p>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search layout components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-2">
        {groupedComponents.map((category) => (
          <div key={category.id} className="mb-4">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <div className="flex items-center space-x-2">
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </div>
              {expandedCategories.includes(category.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {/* Category Components */}
            {expandedCategories.includes(category.id) && (
              <div className="mt-2 space-y-1">
                {category.components.map((component) => (
                  <div
                    key={component.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component.type)}
                    onDragEnd={handleDragEnd}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      {getComponentIcon(component.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {component.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {component.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* No Results */}
        {filteredComponents.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No layout components found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <p>Drag layout containers to the canvas</p>
          <p className="mt-1">Click to select and edit container properties</p>
        </div>
      </div>
    </div>
  );
}

function getComponentIcon(iconName: string) {
  // For emoji icons, return them directly
  if (iconName.startsWith('📄') || iconName.startsWith('📋')) {
    return <span className="text-lg">{iconName}</span>;
  }
  
  // Fallback for any other icon types
  return <span className="text-lg">📄</span>;
} 