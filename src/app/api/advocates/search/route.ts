import db from "@/db";
import { advocates } from "@/db/schema";
import { eq, ilike, or, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  if (!query) {
    return Response.json(
      {
        error: "Search term is required",
      },
      { status: 400 }
    );
  }
  const data = await searchAdvocates(query);
  return Response.json({ data });
}

function searchAdvocates(query: string) {
  const queryNumber = Number(query);

  return db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `${query}%`),
        ilike(advocates.lastName, `${query}%`),
        ilike(advocates.city, `${query}%`),
        ilike(advocates.degree, `${query}%`),
        Number.isNaN(queryNumber)
          ? undefined
          : eq(advocates.yearsOfExperience, queryNumber),
        sql`${advocates.specialties}::text ILIKE ${sql.placeholder("query")}`
      )
    )
    .execute({ query: `%${query}%` });
}
