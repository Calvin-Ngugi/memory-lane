import AlbumsTable from "@/components/albumsTable";
import CreateAlbumModal from "@/components/createAlbumModal";
import { createClient } from "@/utils/supabase/server";

const Albums = async () => {
  const supabase = await createClient();

  // Fetch authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return <div className="text-center mt-10">Unauthorized. Please log in.</div>;
  }

  // Fetch user's albums
  const { data: albums, error: albumError } = await supabase
    .from("albums")
    .select("*")

  if (albumError) {
    console.error("Error fetching albums:", albumError.message);
    return <div className="text-center mt-10">Failed to load albums.</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Albums</h1>
        <CreateAlbumModal userId={user.id} />
      </div>
      <h2 className="text-2xl font-semibold mb-4">All Albums</h2>
      <AlbumsTable albums={albums} />
    </div>
  );
};

export default Albums;
