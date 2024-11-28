import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Fetch a single album by ID
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { id } = params;

  const { data: album, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ data: album });
}

// Update an album
export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("albums")
    .update(body)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// Delete an album
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { id } = params;

  const { error } = await supabase.from("albums").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Album deleted successfully" });
}
