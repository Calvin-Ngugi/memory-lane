"use client";

import { useState, useTransition } from "react";
import { createAlbumAction } from "@/app/actions";
import { SubmitButton } from "./submit-button";

type CreateAlbumModalProps = {
  userId: string;
};

const CreateAlbumModal = ({ userId }: CreateAlbumModalProps) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);

      startTransition(async () => {
        await createAlbumAction(form, userId);
        setFormData({ title: "", description: "" });
        setIsModalOpen(false);
        window.location.reload(); // Reload to fetch the updated list of albums
      });
    } catch (error: any) {
      console.error("Error creating album:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Create Album
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-secondary p-6 rounded shadow-md max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Create a New Album</h2>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <SubmitButton
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </SubmitButton>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAlbumModal;
