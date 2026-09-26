// ============================================================================
// SERVER-ONLY DATA ACCESS
// ============================================================================
// This file is the one safe place the user's finance data is read from. It
// must only ever be imported by Server Components (like page.jsx) — never
// by anything marked "use client". That boundary is what keeps this a real
// security boundary rather than a naming convention: a query here can use
// server secrets, a DB client, or a session-scoped API call, and none of
// that code (or its credentials) is ever sent to the browser.
//
// Right now getFinanceEntries() returns seeded demo data so the app runs
// out of the box. Swap the body for your real fetch, e.g.:
//
//   import { auth } from "@/auth";
//   import { db } from "@/lib/db";
//
//   export async function getFinanceEntries() {
//     const session = await auth();
//     if (!session?.user?.id) return [];
//     return db.financeEntry.findMany({
//       where: { userId: session.user.id },
//       orderBy: { date: "desc" },
//     });
//   }
//
// The Client Components under ./components never call this directly — they
// only ever see data that already came back from here, handed down through
// <FinanceProvider initialEntries={...}> in page.jsx.
// ============================================================================

import { isoDaysAgo } from "./utils";
import { DEFAULT_ACCOUNTS } from "./constants";

const SEED_ENTRIES = [

];

export async function getFinanceEntries() {
  // Simulated latency, as a real DB/API call would have. Remove once this
  // is wired to a real source.
  return SEED_ENTRIES;
}
