export type ComponentType = 
  | 'text'
  | 'heading'
  | 'button'
  | 'image'
  | 'card'
  | 'hero'
  | 'contact-form'
  | 'property-grid'
  | 'divider'
  | 'spacer'
  | 'container-1col'
  | 'container-2col'
  | 'container-3col'
  | 'container-row';

export interface Position {
  x: number;
  y: number;
}

export interface ComponentData {
  id: string;
  type: ComponentType;
  position: Position;
  props: Record<string, any>;
  style: Record<string, any>;
  parentId?: string | null; // ID of parent container, null for page-level components
  size?: {
    width: number;
    height: number;
  };
  locked?: boolean;
  hidden?: boolean;
}

export interface ComponentTemplate {
  type: ComponentType;
  name: string;
  description: string;
  icon: string;
  category: 'basic' | 'content' | 'forms' | 'property' | 'layout';
  defaultProps: Record<string, any>;
  defaultStyle: Record<string, any>;
}

export interface PageLayout {
  id: string;
  name: string;
  components: ComponentData[];
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface CanvasSettings {
  width: number;
  height: number;
  showGrid: boolean;
  gridSize: number;
  snapToGrid: boolean;
  zoom: number;
  backgroundColor: string;
}

export interface BuilderState {
  components: ComponentData[];
  selectedComponent: ComponentData | null;
  canvasSettings: CanvasSettings;
  history: {
    past: ComponentData[][];
    future: ComponentData[][];
  };
  isDragging: boolean;
  isResizing: boolean;
} 