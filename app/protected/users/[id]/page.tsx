import React from "react";
import { createClient } from "@/utils/supabase/server";// Replace with your Supabase client utility
import Image from "next/image";

export default async function UserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const userId = await params.id;
  console.log(userId);
  
  // Fetch user data
  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from("users") // Adjust to match your Supabase `public.users` table
    .select("*")
    .eq("id", userId)
    .single(); // Fetch a single user

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">User Not Found</h1>
        <p className="text-gray-600">We couldn't find any details for this user.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center">
        {/* User Icon */}
        <div className="bg-white rounded-full p-4 mb-4">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlI3nknxWv67R3tLozGQtWPQNSG9iQ_5YcEg&s" // Replace with your icon path
            alt="User Icon"
            width={80}
            height={80}
          />
        </div>

        {/* User Details */}
        <h1 className="text-3xl font-bold mb-4">{user.username || "Unknown User"}</h1>
        <div className="text-lg text-gray-600">
          <p>
            <strong>Email:</strong> {user.email || "Not Provided"}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phone || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
}
