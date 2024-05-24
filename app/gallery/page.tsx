import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { GalleryPage } from "@/app/gallery/gallery-page";

export default async function Gallery() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const { data } = await supabase
  //   .from("data")
  //   .select("*")
  //   .order("created_at", { ascending: false })
  //   .match({ user_id: session?.user.id || "", failed: false });

  const data = [
    {
      "created_at": "2023-01-01T00:00:00Z",
      "failed": false,
      "id": "1",
      "input": "00001-3343821466.png",
      "output": "12345.mp4",
      "user_id": "1"
    },
    {
      "created_at": "2023-01-02T00:00:00Z",
      "failed": null,
      "id": "2",
      "input": "00001-3343821466.png",
      "output": "12345.mp4",
      "user_id": "1"
    }
  ]
  

  return <GalleryPage data={data} />;
}
