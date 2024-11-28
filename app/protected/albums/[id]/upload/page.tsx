import { UploadForm } from "@/components/upload-form";

// Pass album ID dynamically via params
export default function UploadPage({ params }: { params: { id: string } }) {
  const albumId = params.id;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Upload Images</h1>
      <UploadForm albumId={albumId} />
    </div>
  );
}
