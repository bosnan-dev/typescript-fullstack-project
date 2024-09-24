import { createFileRoute } from '@tanstack/react-router';

import { CounterButton } from '../components/CounterButton';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <main className="container flex flex-col gap-8 justify-center items-center min-h-screen p-8 text-center mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold text-balance max-w-screen-lg">
        Welcome <br />
        Fullstack Project!
      </h1>
      <CounterButton />
    </main>
  );
}
