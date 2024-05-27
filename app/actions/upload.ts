"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
// import { waitUntil } from "@vercel/functions";

export async function upload(previousState: any, formData: FormData) {
  const user_id = 'wangshu_next_test';

  console.log('Fields:' + formData + ', keys: ' + 
    formData.keys + ', values: ' + formData.values);


  const image = formData.get("image") as File;
  if (!image) {
    return { message: "Missing image", status: 400 };
  }

  console.info('image: ' + image);
  
  const audio = formData.get("audio") as File;
  if (!audio) {
    return { message: "Missing audio", status: 400 };
  }

  console.info('audio: ' + audio);

  const postFormData = new FormData();
  postFormData.append('image', image);
  postFormData.append('audio', audio);

  console.log('start post request.');

  try {
    const response = await fetch('http://localhost:8000/api/file/upload', {
      method: 'POST',
      body: postFormData,
    });

    console.log('response: ' + response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('Files uploaded successfully:', result);
      // Handle success
    } else {
      console.log('bug response.');
    }
  } catch (error) {
    console.error('Error uploading files:', error);
  }

  redirect(`/`);
}