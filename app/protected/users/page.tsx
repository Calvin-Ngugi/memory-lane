import UsersTable from "@/components/users-table";
import { createClient } from "@/utils/supabase/server";

const Users = async () => {
  const supabase = await createClient();

  // Fetch users
  const { data: usersWithAlbumCount, error: usersError } = await supabase
    .from("users")
    .select("*, albums (id)");

  if (usersError) {
    console.error("Error fetching users with album count:", usersError.message);
  }

  const users = usersWithAlbumCount? usersWithAlbumCount.map((user) => ({
    ...user,
    albumCount: user.albums.length, // Count the number of albums
  })) : [];

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <UsersTable users={users || []} />
    </div>
  );
};

export default Users;
