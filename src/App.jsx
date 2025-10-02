import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Rollin Frontend</h1>
      <p>Vite + React starter ready for AWS Amplify hosting.</p>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <p style={{ marginTop: '2rem', fontSize: '.875rem', opacity: .7 }}>
        Environment: {import.meta.env.MODE} | Example var: {import.meta.env.VITE_EXAMPLE || 'not set'}
      </p>
    </div>
  );
}
