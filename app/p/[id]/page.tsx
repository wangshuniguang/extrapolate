import PhotoPage from "@/app/p/[id]/photo-page";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

// export const revalidate = 1;

// export async function generateStaticParams() {
//   return [];
// }

export default async function Photo({ params }: { params: { id: string } }) {
  const { id } = params;
  return <PhotoPage id={id} data={fallbackData} />;
}
