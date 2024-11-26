"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Album = {
  id: string;
  name: string;
  description: string;
};

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [userId, setUserId] = useState<string | null>(null); // State to store user_id
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(supabase);
      if (user) {
        setUserId(user.id);
        await fetchAlbums();
      } else {
        // Redirect to login if no user
        console.log("No user found");
      }
    };
    fetchUser();
    fetchAlbums();
  }, []);

  console.log(userId);

  const fetchAlbums = async () => {
    try {
      const res = await fetch("/api/albums");
      const data = await res.json();
      if (res.ok) {
        setAlbums(data.data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    }
  };

  const handleCreateAlbum = async () => {
    if (!userId) {
      alert("User is not logged in. Cannot create album.");
      return;
    }
  
    try {
      const res = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: userId }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setAlbums((prev) => [...prev, data.data]);
        setFormData({ name: "", description: "" });
        setIsModalOpen(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to create album:", error);
    }
  };
  

  const handleViewAlbum = (id: string) => {
    router.push(`/protected/albums/${id}`);
  };

  return (
    <div>
      <h1>Albums</h1>
      <button onClick={() => setIsModalOpen(true)}>Create Album</button>
      <div>
        <h2>All Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <h3>{album.name}</h3>
              <p>{album.description}</p>
              <button onClick={() => handleViewAlbum(album.id)}>View Album</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            className="w-100"
          >
            <h2>Create a New Album</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <input type="hidden" value={userId ?? ""}/>
            <button onClick={handleCreateAlbum} style={{ marginRight: "10px" }}>
              Create
            </button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
