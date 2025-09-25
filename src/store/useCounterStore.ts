import { create } from 'zustand';

// Define the store's state type
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (value: number) => void;
}

// Create the store
export const useCounterStore = create<CounterState>((set) => ({
  // Initial state
  count: 0,
  
  // Actions that modify the state
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value) => set((state) => ({ count: state.count + value })),
}));
