# Zustand State Management

This project uses [Zustand](https://github.com/pmndrs/zustand) for state management. Zustand is a small, fast, and scalable state management solution.

## Basic Usage

### Creating a Store

```typescript
// src/store/useCounterStore.ts
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

### Using the Store in Components

```typescript
// src/components/SomeComponent.tsx
import { useCounterStore } from '../store/useCounterStore';

export const SomeComponent = () => {
  // Get state and actions from the store
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

## Advanced Usage

### Combining Multiple Stores

You can create multiple stores for different parts of your application and use them together:

```typescript
// Using multiple stores in a component
import { useCounterStore } from '../store/useCounterStore';
import { useUserStore } from '../store/useUserStore';

export const MyComponent = () => {
  const { count, increment } = useCounterStore();
  const { user, updateUser } = useUserStore();
  
  // Use both stores...
};
```

### Middleware

Zustand supports middleware for adding additional functionality:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePersistedStore = create(
  persist(
    (set) => ({
      // your state and actions
    }),
    {
      name: 'my-storage-key',
    }
  )
);
```

### TypeScript Support

Zustand has excellent TypeScript support, allowing you to define the shape of your store with interfaces or types.

## Best Practices

1. **Keep stores small and focused**: Create separate stores for different domains of your application.
2. **Use selectors**: When accessing store state, use selectors to only re-render when the selected state changes.
3. **Organize related state**: Group related state and actions together in the same store.
4. **Use middleware when needed**: For persistence, devtools, etc.

## Additional Resources

- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
