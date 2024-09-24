import { createContext, ReactNode, useState } from 'react';

type CounterContextValue = {
  counter: number;
  handleClick: () => void;
};

export const CounterContext = createContext<CounterContextValue>({
  counter: 0,
  handleClick: () => {},
});

type CounterContextProviderProps = {
  children: ReactNode;
};

export function CounterContextProvider({
  children,
}: CounterContextProviderProps) {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <CounterContext.Provider value={{ counter, handleClick }}>
      {children}
    </CounterContext.Provider>
  );
}
