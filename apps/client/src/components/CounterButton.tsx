import { useState } from 'react';

export function CounterButton() {
  const [counter, setCounter] = useState(0);

  return (
    <button
      className="px-4 py-2 rounded-md bg-indigo-500  text-white"
      onClick={() => setCounter((v) => v + 1)}
    >
      Clicks: {counter}
    </button>
  );
}
