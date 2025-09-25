import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Counter } from './components/Counter'

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Zustand</h1>
      
      {/* Zustand Counter Example */}
      <div className="card">
        <Counter />
        <p className="mt-4">
          Edit <code>src/components/Counter.tsx</code> and <code>src/store/useCounterStore.ts</code> to modify the counter.
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
