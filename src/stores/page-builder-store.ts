import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ComponentData, ComponentType, PageLayout } from '@/types/page-builder';

interface PageBuilderStore {
  // State
  components: ComponentData[];
  selectedComponent: ComponentData | null;
  layouts: PageLayout[];
  currentLayoutId: string | null;
  
  // Actions
  addComponent: (component: ComponentData) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (fromIndex: number, toIndex: number) => void;
  selectComponent: (component: ComponentData | null) => void;
  
  // Layout Management
  saveLayout: (name?: string) => void;
  loadLayout: (layoutId: string) => void;
  clearLayout: () => void;
  deleteLayout: (layoutId: string) => void;
  duplicateLayout: (layoutId: string) => void;
  
  // History Management
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Utility
  exportLayout: () => string;
  importLayout: (json: string) => void;
}

const STORAGE_KEY = 'rumora-page-builder';

export const usePageBuilderStore = create<PageBuilderStore>()(
  persist(
    (set, get) => ({
      // Initial State
      components: [],
      selectedComponent: null,
      layouts: [],
      currentLayoutId: null,
      
      // Component Actions
      addComponent: (component: ComponentData) => {
        set((state) => {
          const newComponents = [...state.components, component];
          return {
            components: newComponents,
            selectedComponent: component
          };
        });
        get().saveToHistory();
      },
      
      updateComponent: (id: string, updates: Partial<ComponentData>) => {
        set((state) => ({
          components: state.components.map(comp =>
            comp.id === id ? { ...comp, ...updates } : comp
          ),
          selectedComponent: state.selectedComponent?.id === id
            ? { ...state.selectedComponent, ...updates }
            : state.selectedComponent
        }));
        get().saveToHistory();
      },
      
      removeComponent: (id: string) => {
        set((state) => ({
          components: state.components.filter(comp => comp.id !== id),
          selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent
        }));
        get().saveToHistory();
      },
      
      reorderComponents: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newComponents = [...state.components];
          const [movedComponent] = newComponents.splice(fromIndex, 1);
          newComponents.splice(toIndex, 0, movedComponent);
          return { components: newComponents };
        });
        get().saveToHistory();
      },
      
      selectComponent: (component: ComponentData | null) => {
        set({ selectedComponent: component });
      },
      
      // Layout Management
      saveLayout: (name?: string) => {
        const state = get();
        const layoutName = name || `Layout ${new Date().toLocaleDateString()}`;
        
        const layout: PageLayout = {
          id: state.currentLayoutId || `layout-${Date.now()}`,
          name: layoutName,
          components: state.components,
          createdAt: state.currentLayoutId 
            ? state.layouts.find(l => l.id === state.currentLayoutId)?.createdAt || new Date().toISOString()
            : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: '1.0.0'
        };
        
        set((state) => ({
          layouts: state.currentLayoutId
            ? state.layouts.map(l => l.id === state.currentLayoutId ? layout : l)
            : [...state.layouts, layout],
          currentLayoutId: layout.id
        }));
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          layouts: get().layouts,
          currentLayoutId: layout.id
        }));
      },
      
      loadLayout: (layoutId: string) => {
        const state = get();
        const layout = state.layouts.find(l => l.id === layoutId);
        
        if (layout) {
          set({
            components: layout.components,
            selectedComponent: null,
            currentLayoutId: layoutId
          });
        }
      },
      
      clearLayout: () => {
        set({
          components: [],
          selectedComponent: null,
          currentLayoutId: null
        });
        get().saveToHistory();
      },
      
      deleteLayout: (layoutId: string) => {
        set((state) => ({
          layouts: state.layouts.filter(l => l.id !== layoutId),
          currentLayoutId: state.currentLayoutId === layoutId ? null : state.currentLayoutId
        }));
      },
      
      duplicateLayout: (layoutId: string) => {
        const state = get();
        const layout = state.layouts.find(l => l.id === layoutId);
        
        if (layout) {
          const newLayout: PageLayout = {
            ...layout,
            id: `layout-${Date.now()}`,
            name: `${layout.name} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          set((state) => ({
            layouts: [...state.layouts, newLayout]
          }));
        }
      },
      
      // History Management
      saveToHistory: () => {
        const state = get();
        const historyKey = `${STORAGE_KEY}-history`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        // Keep only last 50 states
        if (history.length >= 50) {
          history.shift();
        }
        
        history.push({
          components: state.components,
          timestamp: Date.now()
        });
        
        localStorage.setItem(historyKey, JSON.stringify(history));
      },
      
      undo: () => {
        const historyKey = `${STORAGE_KEY}-history`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history.length > 1) {
          history.pop(); // Remove current state
          const previousState = history[history.length - 1];
          
          set({
            components: previousState.components,
            selectedComponent: null
          });
          
          localStorage.setItem(historyKey, JSON.stringify(history));
        }
      },
      
      redo: () => {
        // Implementation for redo functionality
        // This would require storing both past and future states
      },
      
      canUndo: () => {
        const historyKey = `${STORAGE_KEY}-history`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        return history.length > 1;
      },
      
      canRedo: () => {
        return false; // Implement when redo is implemented
      },
      
      // Utility Functions
      exportLayout: () => {
        const state = get();
        return JSON.stringify({
          components: state.components,
          metadata: {
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
          }
        }, null, 2);
      },
      
      importLayout: (json: string) => {
        try {
          const data = JSON.parse(json);
          if (data.components && Array.isArray(data.components)) {
            set({
              components: data.components,
              selectedComponent: null,
              currentLayoutId: null
            });
            get().saveToHistory();
          }
        } catch (error) {
          console.error('Failed to import layout:', error);
          alert('Failed to import layout. Please check the file format.');
        }
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        layouts: state.layouts,
        currentLayoutId: state.currentLayoutId
      })
    }
  )
); 