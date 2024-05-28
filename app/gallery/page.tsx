import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { GalleryPage } from "@/app/gallery/gallery-page";

export default async function Gallery() {
  try {
    const response = await fetch('http://101.37.145.99:8000/api/sound_emojis');
    console.log('response: ' + response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('Query sound emojis successfully:', result);
      const data = result.map(em => ({
        "created_at": em.gmt_create,
        "failed": false,
        "id": em.id,
        "input": em.image_oss_path,
        "output": em.video_oss_path,
        "user_id": em.user_id
      }));

      return <GalleryPage data={data} />;
    } else {
      console.log('Failed to query response.');
      return { message: "Prediction error generating mp4", status: 500 };
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    return {
      message: "Unexpected error generating gif, please try again",
      status: 500,
    };
  }
}
