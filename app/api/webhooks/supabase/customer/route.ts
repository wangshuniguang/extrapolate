import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { UserData } from "@/lib/types";

export const runtime = "edge";

type SupabaseWebhook = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: { [key: string]: any } | null;
  schema: string;
  old_record: { [key: string]: any } | null;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SupabaseWebhook;

  const supabase = createAdminClient();

  const record = body.record as UserData;
  const old_record = body.old_record as UserData;

  return new Response("OK", { status: 200 });
}
