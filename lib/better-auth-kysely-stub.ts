/**
 * Stub for @better-auth/kysely-adapter — only used when Drizzle is the database adapter.
 * better-auth still imports getKyselyDatabaseType at init; this avoids bundling kysely dialects.
 */
export type KyselyDatabaseType = "postgres" | "mysql" | "sqlite" | "mssql";

export function getKyselyDatabaseType(): KyselyDatabaseType | null {
  return null;
}

export async function createKyselyAdapter() {
  return {
    kysely: null,
    databaseType: null,
    transaction: undefined,
  };
}

export function kyselyAdapter() {
  throw new Error("Kysely adapter is not used in this project (Drizzle is configured).");
}
