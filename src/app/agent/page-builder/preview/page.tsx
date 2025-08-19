"use client";

import { useEffect, useState } from "react";
import { ComponentData } from "@/types/page-builder";

export default function PagePreview() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the saved layout from localStorage
    const savedLayout = localStorage.getItem('rumora-page-builder');
    if (savedLayout) {
      try {
        const data = JSON.parse(savedLayout);
        if (data.components) {
          setComponents(data.components);
        }
      } catch (error) {
        console.error('Failed to load layout:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const renderComponent = (component: ComponentData) => {
    const { type, props, style } = component;
    
    switch (type) {
      case 'text':
        return (
          <div key={component.id} style={style} className="min-w-[100px] min-h-[24px]">
            {props.content}
          </div>
        );
      
      case 'heading':
        const HeadingTag = props.level || 'h1';
        return (
          <HeadingTag key={component.id} style={style} className="min-w-[200px] min-h-[40px]">
            {props.content}
          </HeadingTag>
        );
      
      case 'button':
        return (
          <button key={component.id} style={style} className="min-w-[120px] min-h-[40px] cursor-pointer">
            {props.text}
          </button>
        );
      
      case 'image':
        return (
          <img
            key={component.id}
            src={props.src}
            alt={props.alt}
            style={style}
            className="min-w-[200px] min-h-[150px] object-cover"
          />
        );
      
      case 'card':
        return (
          <div key={component.id} style={style} className="min-w-[300px] min-h-[200px]">
            <h3 className="font-semibold mb-2">{props.title}</h3>
            <p>{props.content}</p>
          </div>
        );
      
      case 'hero':
        return (
          <div key={component.id} style={style} className="min-w-[600px] min-h-[300px] flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">{props.title}</h1>
            <p className="text-xl mb-6">{props.subtitle}</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              {props.buttonText}
            </button>
          </div>
        );
      
      case 'contact-form':
        return (
          <div key={component.id} style={style} className="min-w-[400px] min-h-[300px]">
            <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
              <textarea placeholder="Message" className="w-full p-2 border rounded h-20" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                {props.submitText}
              </button>
            </div>
          </div>
        );
      
      case 'property-grid':
        return (
          <div key={component.id} style={style} className="min-w-[600px] min-h-[400px]">
            <h3 className="text-2xl font-semibold mb-6 text-center">{props.title}</h3>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: Math.min(props.count, 6) }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
                  <h4 className="font-medium">Property {i + 1}</h4>
                  <p className="text-sm text-gray-600">Sample property details</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'divider':
        return (
          <div key={component.id} style={style} className="min-w-[400px] min-h-[1px] bg-gray-300" />
        );
      
      case 'spacer':
        return (
          <div key={component.id} style={{ height: props.height || 40 }} className="min-w-[100px]" />
        );
      
      case 'container-1col':
        return (
          <div key={component.id} style={style} className="min-w-[600px] min-h-[200px]">
            <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
            <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
              <p className="text-gray-500 text-center">
                {props.content}<br />
                <span className="text-sm">Drop components here</span>
              </p>
            </div>
          </div>
        );
      
      case 'container-2col':
        return (
          <div key={component.id} style={style} className="min-w-[800px] min-h-[200px]">
            <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.leftContent}<br />
                  <span className="text-sm">Left column</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.rightContent}<br />
                  <span className="text-sm">Right column</span>
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'container-3col':
        return (
          <div key={component.id} style={style} className="min-w-[1000px] min-h-[200px]">
            <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.col1Content}<br />
                  <span className="text-sm">Column 1</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.col2Content}<br />
                  <span className="text-sm">Column 2</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  {props.col3Content}<br />
                  <span className="text-sm">Column 3</span>
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'container-row':
        return (
          <div key={component.id} style={style} className="min-w-[800px] min-h-[100px]">
            <h3 className="text-lg font-semibold mb-3">{props.title}</h3>
            <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 min-h-[60px] flex items-center justify-center">
              <p className="text-gray-500 text-center">
                {props.content}<br />
                <span className="text-sm">Row content - drop components here</span>
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div key={component.id} className="min-w-[100px] min-h-[50px] bg-gray-200 flex items-center justify-center text-gray-500">
            {type}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          <h1 className="text-2xl font-bold mb-4">No Layout Found</h1>
          <p className="mb-4">No page layout has been saved yet.</p>
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close Preview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Header */}
      <div className="bg-gray-100 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded"></div>
          <span className="font-semibold">Page Preview</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Preview Mode</span>
          <button
            onClick={() => window.close()}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="relative w-full bg-white">
        {/* Page Container */}
        <div className="mx-auto" style={{ width: '1200px', minHeight: '800px' }}>
          {components.map((component) => (
            <div
              key={component.id}
              className="relative"
              style={{
                left: component.position.x,
                top: component.position.y,
                zIndex: 1,
                width: '100%'
              }}
            >
              {renderComponent(component)}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Footer */}
      <div className="bg-gray-100 border-t px-4 py-3 text-center text-sm text-gray-600">
        <p>This is a preview of your landing page. Close this window to return to the page builder.</p>
      </div>
    </div>
  );
} 