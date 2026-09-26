// ============================================================================
// SERVER COMPONENT — no "use client" here, and no useState/useEffect/hooks.
// This is the boundary described in ../lib/data.js: it's the only place
// that calls getFinanceEntries(), server-side, before anything is sent to
// the browser. The result is handed to <FinanceProvider> as initialEntries,
// which is a Client Component and is where interactivity (context, state,
// event handlers) actually begins.
// ============================================================================

import { getFinanceEntries } from "./lib/data";
import { FinanceProvider } from "./context/FinanceContext";
import FinanceView from "./components/FinanceView";

export default async function Page() {
  const initialEntries = await getFinanceEntries();

  return (
    <FinanceProvider initialEntries={initialEntries}>
      <FinanceView />
    </FinanceProvider>
  );
}
