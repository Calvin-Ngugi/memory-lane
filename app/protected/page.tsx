import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CreateAlbumModal from "@/components/createAlbumModal";
import AlbumsTable from "@/components/albumsTable";
import Card from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const cardsData = [
    { title: "Create Albums", description: "Organize your photos by creating albums and manage them easily.." },
    { title: "View Albums", description: "Browse through all your albums and relive your favorite moments." },
    { title: "Share with Friends", description: "Easily share your albums with friends and family with a few clicks." },
  ];

  // Fetch user-specific albums
  const { data: albums, error } = await supabase
    .from("albums")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching albums:", error.message);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* User Greeting Section */}
      <h2 className="font-bold text-2xl mb-4">Hey, {user.email} 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </div>

      {/* Album Section */}
      <div>
        <h2 className="font-bold text-2xl mb-4">Your Albums</h2>
        {albums?.length ? (
          <AlbumsTable albums={albums} />
        ) : (
          <div className="rounded bg-gray-800 text-gray-100 p-4">
            <div className="flex flex-col items-center gap-4">
              <p>You don't have any albums yet. Start by creating one!</p>
              <CreateAlbumModal userId={user.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
