import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImagesList } from "@/components/images-list";
import { createClient } from "@/utils/supabase/server";

// Fetch images dynamically based on the album ID
export default async function ImagesPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const albumId = params.id;
  // Fetch authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return <div className="text-center mt-10">Unauthorized. Please log in.</div>;
  }

  // Fetch images for the album
  const { data: images, error } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", albumId);

  if (error) {
    console.error("Error fetching images:", error.message);
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold">Image Gallery</h1>
        <p className="text-red-500">Failed to fetch images. Please try again later.</p>
      </div>
    );
  }

  const { data: album, error: albumError } = await supabase
    .from("albums")
    .select("*")
    .eq("id", albumId)
    .single();

  if (albumError) {
    console.error("Error fetching album:", albumError.message);
    return (
      <div>
        <p>Error loading album. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Image Gallery</h1>
        {album?.user_id === user.id ?
          (
          <Link href={`/protected/albums/${albumId}/upload`}>
            <Button>Upload New Image</Button>
          </Link>
          ) : (
            <p></p>
          )
        }
      </div>
      {images?.length ? (
        <ImagesList images={images} />
      ) : (
        <p className="text-gray-500">No images available for this album.</p>
      )}
    </div>
  );
}
