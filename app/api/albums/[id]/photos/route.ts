import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const albumId = params.id;

  if (!albumId) {
    return NextResponse.json({ error: "Album ID is required" }, { status: 400 });
  }

  // Convert file to Base64
  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  // Prepare image data
  const base64DataURL = `data:${file.type};base64,${base64Image}`;

  const supabase = await createClient();

  // Insert into the `photos` table with `album_id`
  const { data, error } = await supabase
    .from("photos")
    .insert({
      name: file.name,
      image_url: base64DataURL,
      album_id: albumId,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Image uploaded successfully", data });
};
