import React from 'react';
import { useCounterStore } from '../store/useCounterStore';
import { Button } from '@/components/ui/button';

export const Counter: React.FC = () => {
  // Get state and actions from the store
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Counter: {count}</h2>
      
      <div className="flex gap-2">
        <Button variant="destructive" onClick={increment}>Click me</Button>
        
        <Button variant="default" onClick={decrement}>Decrement</Button>
        
        <Button variant="outline" onClick={reset}>Reset</Button>
        <Button variant="secondary" onClick={() => incrementBy(10)}>Add 10</Button>
      </div>
    </div>
  );
};
