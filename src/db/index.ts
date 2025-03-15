import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle>;
if (process.env.DATABASE_URL) {
  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  db = drizzle(queryClient, { schema });
} else {
  console.warn("DATABASE_URL is not set. Use mock db instance");
  db = {
    select: () => ({
      from: () => [],
    }),
  } as unknown as ReturnType<typeof drizzle>;
}
export default db;
