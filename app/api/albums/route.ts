import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Toast from "@/components/Toast";

// Fetch all albums for the authenticated user
export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch albums associated with the user
    const { data: albums, error: albumError } = await supabase
      .from("albums")
      .select("*")
      .eq("user_id", user.id);

    if (albumError) {
      return NextResponse.json({ error: albumError.message }, { status: 500 });
    }

    return NextResponse.json({ data: albums });
  } catch (err) {
    console.log("GET error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Create a new album for the authenticated user
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    // Fetch authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract request data
    const { title, description } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing title" },
        { status: 400 }
      );
    }

    // Create a new album associated with the user
    const { data, error } = await supabase
      .from("albums")
      .insert([{ title, description, user_id: user.id }])
      .select(); // Use .select() to return the newly created record

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) { 
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
