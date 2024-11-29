"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation"; // Use `useRouter` for client-side navigation
import { Button } from "./ui/button";

type User = {
  id: string;
  email: string;
  username: string;
  phone: string;
  albumCount: number;
};

type UsersTableProps = {
  users: User[];
};

const UsersTable = ({ users }: UsersTableProps) => {
  const { theme } = useTheme();
  const router = useRouter(); // Initialize `useRouter`

  if (!users || users.length === 0) {
    return <div className="mt-6 text-gray-500">No users found.</div>;
  }

  const handleViewUser = (id: string) => {
    router.push(`/protected/users/${id}`); // Client-side navigation
  };

  // Define styles for light and dark modes
  const isDarkMode = theme !== "light";
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
      <div className={`${tableWrapperClasses} overflow-auto`}>
        <table className="w-full text-sm border-collapse border border-gray-600">
          <thead>
            <tr className={`${tableHeaderClasses} text-left`}>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                ID
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Username
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Email
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Phone number
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Album count
              </th>
              <th className={`py-2 px-4 font-semibold border ${tableCellBorderClasses}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="transition-colors">
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {user.id}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {user.username}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {user.email}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {user.phone}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  {user.albumCount}
                </td>
                <td className={`border px-4 py-2 text-left ${tableCellBorderClasses}`}>
                  <Button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleViewUser(user.id)}
                  >
                    View User
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
