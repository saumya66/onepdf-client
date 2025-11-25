# Zustand State Management

This project uses [Zustand](https://github.com/pmndrs/zustand) for state management. Zustand is a small, fast, and scalable state management solution.

## Current Stores

### Auth Store (useAuthStore)

The auth store manages user authentication state with localStorage persistence:

```typescript
// src/store/useAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (data) => { /* ... */ },
      logout: () => { /* ... */ },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)
```

### Using the Store in Components

```typescript
// In any component
import { useAuthStore } from '@/store/useAuthStore'

export const Dashboard = () => {
  // Get state and actions from the store
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
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
