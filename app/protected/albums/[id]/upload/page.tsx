import { UploadForm } from "@/components/upload-form";

// Pass album ID dynamically via params
export default async function UploadPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const albumId = params.id;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Upload Images</h1>
      <UploadForm albumId={albumId} />
    </div>
  );
}
