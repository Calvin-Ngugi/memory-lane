"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "./imageModal";

interface Image {
  id: number;
  image_url: string;
  name: string;
  title: string;
}

export function ImagesList({ initialImages }: { initialImages: Image[] }) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>(initialImages);

  const handleUpdateTitle = (id: number, newTitle: string) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === id ? { ...img, title: newTitle } : img))
    );
  };

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <li key={image.id} className="cursor-pointer">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-lg p-4 border"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.image_url}
                alt={image.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <h3 className="mt-2 font-bold text-lg">{image.title}</h3>
          </li>
        ))}
      </ul>
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onUpdateTitle={handleUpdateTitle}
      />
    </>
  );
}
