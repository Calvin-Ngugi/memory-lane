import UsersTable from "@/components/users-table";
import { createClient } from "@/utils/supabase/server";

const Users = async () => {
  const supabase = await createClient();

  // Fetch users
  const { data: users, error } = await supabase
    .from("users")
    .select("*")

  if (error) {
    console.error("Error fetching users:", error.message);
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <UsersTable users={users || []} />
    </div>
  );
};

export default Users;
