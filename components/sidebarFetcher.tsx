import { createClient } from "@/utils/supabase/server";
import Sidebar from "./ui/sidebar";

const SidebarFetcher = async () => {
    const supabase = await createClient();

  // Fetch the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Sidebar isAuthenticated={!!user} />;
};

export default SidebarFetcher;
