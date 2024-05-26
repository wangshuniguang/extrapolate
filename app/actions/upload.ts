"use server";

import Replicate from "replicate";
import { createAdminClient } from "@/lib/supabase/admin";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
// import { waitUntil } from "@vercel/functions";

export async function upload(previousState: any, formData: FormData) {
  // Authenticate
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user_id = 'wangshu_next_test';
  const supabaseAdmin = createAdminClient();

  const image = formData.get("image") as File;
  if (!image) {
    return { message: "Missing image", status: 400 };
  }
  
  const audio = formData.get("audio") as File;
  if (!audio) {
    return { message: "Missing audio", status: 400 };
  }

  // Handle request
  // Generate key and insert id to supabase
  const { key } = await setRandomKey(user_id);
  const input = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/input/${user_id}/${key}`;


  const { data: storageData, error: storageError } = await supabaseAdmin.storage
    .from("input")
    .upload(`/${user_id}/${key}`, image, {
      contentType: image.type,
      cacheControl: "3600",
      upsert: true,
    });

  if (storageError)
    return {
      message: "Unexpected error uploading image, please try again",
      status: 400,
    };

  const { data: audioStorageData, error: audioStorageError } = await supabaseAdmin.storage
    .from("input")
    .upload(`/${user_id}/${key}`, audio, {
      contentType: audio.type,
      cacheControl: "3600",
      upsert: true,
    });

  if (audioStorageError)
    return {
      message: "Unexpected error uploading audio, please try again",
      status: 400,
    };

  redirect(`/p/${key}`);
}

// Generates new key that doesn't already exist in db
async function setRandomKey(user_id: string): Promise<{ key: string }> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  /* recursively set link till successful */
  const key = nanoid();
  const { error } = await supabase.from("data").insert({
    id: key,
    input: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/input/${user_id}/${key}`,
  });
  if (error) {
    // by the off chance that key already exists
    return setRandomKey(user_id);
  } else {
    return { key };
  }
}