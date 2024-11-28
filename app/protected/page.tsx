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

  const { data: fetchedUser } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching user", error.message);
  }

  // Fetch users and their album counts
  const { data: usersWithAlbumCount, error: usersError } = await supabase
    .from("users")
    .select("id, username, email, albums (id)");

  if (usersError) {
    console.error("Error fetching users with album count:", usersError.message);
  }

  const users = usersWithAlbumCount? usersWithAlbumCount.map((user) => ({
    ...user,
    albumCount: user.albums.length, // Count the number of albums
  })) : [];

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* User Greeting Section */}
      <h2 className="font-bold text-2xl mb-4">Hey, {fetchedUser?.[0]?.username} 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cardsData.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </div>

      {/* Users section */}
      <div>
        <h2 className="font-bold text-2xl mb-4">Users in the System</h2>
        <p>These are all the users in the system with their album count:</p>
        {usersWithAlbumCount?.length ? (
          <div className="overflow-auto rounded bg-gray-800 text-gray-100 p-4">
            <table className="w-full text-sm border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-100 text-gray-800 text-left">
                  <th className="py-2 px-4 font-semibold border border-gray-700">Username</th>
                  <th className="py-2 px-4 font-semibold border border-gray-700">Email</th>
                  <th className="py-2 px-4 font-semibold border border-gray-700">Album Count</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors">
                    <td className="border px-4 py-2 text-left border-gray-700">{user.username}</td>
                    <td className="border px-4 py-2 text-left border-gray-700">{user.email}</td>
                    <td className="border px-4 py-2 text-left border-gray-700">{user.albumCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-6 text-gray-500">No users found.</p>
        )}
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
