"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Image {
  id: number;
  image_url: string;
  name: string;
  title: string;
}

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
  onUpdateTitle: (id: number, newTitle: string) => void;
}

export function ImageModal({ image, onClose, onUpdateTitle }: ImageModalProps) {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (image) {
      setTitle(image.title);
    }
  }, [image]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!image) return null;

  const handleSave = () => {
    if (image && title.trim() !== "") {
      onUpdateTitle(image.id, title.trim());
      onClose();
    }
  };

  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogTitle>{image.title}</DialogTitle>
      <DialogContent className="max-w-xl max-h-xl p-0">
        <div className="relative">
          <Image
            src={image.image_url}
            alt={image.name}
            width={800}
            height={600}
            className="w-full h-auto"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-opacity"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Edit Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Enter a new title"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
