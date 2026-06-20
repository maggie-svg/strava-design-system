import { Button } from "./app/components/Button/Button";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-lg p-2xl">
      <h1 className="text-label-large">Strava Design System</h1>
      <p className="text-body text-on-surface-variant">
        Run <code>npm run storybook</code> to explore components.
      </p>
      <Button>Start Activity</Button>
    </main>
  );
}
