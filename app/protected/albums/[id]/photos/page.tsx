"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const Photos = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const { id: albumId } = useParams(); // Extract album ID from route parameters

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    if (!albumId) {
      alert("Album ID is missing in the route!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/albums/${albumId}/photos`, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid server response. Expected JSON.");
      }

      const data = await response.json();

      if (response.ok) {
        setUploadUrl(data.data?.image_URL || null);
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error: any) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <img src={uploadUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default Photos;
