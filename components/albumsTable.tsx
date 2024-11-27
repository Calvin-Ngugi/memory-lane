"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type Album = {
  id: string;
  title: string;
  user_id: string;
  description: string;
};

type AlbumsTableProps = {
  albums: Album[];
};

const AlbumsTable = ({ albums }: AlbumsTableProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleViewAlbum = (id: string) => {
    router.push(`/protected/albums/${id}`);
  };

  if (!albums || albums.length === 0) {
    return <div className="mt-6 text-gray-500">No albums found.</div>;
  }

  // Define styles for light and dark modes
  const isDarkMode = theme != "light";
  const tableWrapperClasses = isDarkMode
    ? "rounded bg-gray-800 text-gray-100 p-4"
    : "rounded bg-gray-100 text-gray-900 p-4";
  const tableHeaderClasses = isDarkMode
    ? "bg-gray-100 text-gray-700"
    : "bg-gray-800 text-gray-100";
  const tableCellBorderClasses = isDarkMode
    ? "border-gray-700"
    : "border-gray-600";

  return (
    <div className="mt-6">
      <div className={tableWrapperClasses}>
        <table className="w-full text-sm table-auto border-collapse border border-gray-600">
          <thead>
            <tr className={`${tableHeaderClasses} text-left`}>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Title
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Description
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                User ID
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id} className="transition-colors">
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {album.title}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {album.description}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {album.user_id}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleViewAlbum(album.id)}
                  >
                    View Album
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AlbumsTable;
