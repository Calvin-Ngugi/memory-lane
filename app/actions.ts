"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const phone = formData.get("phone")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !username) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email, password, and username are required"
    );
  }

  // Sign up the user in Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        username, 
      },
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (signUpError) {
    return encodedRedirect("error", "/sign-up", signUpError.message);
  }

  // Insert into the public.users table
  const { error: usersError } = await supabase.from("users").insert({
    user_id: signUpData.user?.id,
    email,
    username,
    phone,
  });

  if (usersError) {
    console.error("Error creating user in public.users:", usersError.message);
    return encodedRedirect(
      "error",
      "/sign-up",
      "Could not complete sign-up process"
    );
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createAlbumAction = async (formData: FormData, userId: string) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();

  if (!title) {
    throw new Error("Title is required.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .insert([{ title, description, user_id: userId }])
    .select("*")
    .single();

  if (error) {
    console.error("Error creating album:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function uploadImage(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const albumId = formData.get("album_id") as string;

  if (!file || !title || !albumId) {
    throw new Error("All fields (file, title, album_id) are required.");
  }

  // Convert file to Base64
  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const base64DataURL = `data:${file.type};base64,${base64Image}`;

  // Insert the image data into the Supabase `photos` table
  const { data, error } = await supabase
    .from("photos")
    .insert({
      name: file.name,
      title,
      image_url: base64DataURL,
      album_id: albumId,
    })
    .select();

  if (error) {
    console.error("Upload failed:", error.message);
    throw new Error("Failed to upload the image. Please try again.");
  }

  // Revalidate the path for real-time updates
  revalidatePath("/protected/albums/[id]/images");

  return { message: "Image uploaded successfully!", photo: data[0] };
}