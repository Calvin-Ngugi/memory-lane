"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SubmitButton } from "../submit-button";
import { signOutAction } from "@/app/actions";
import { useTheme } from "next-themes";

type SidebarProps = {
  isAuthenticated: boolean;
};

const Sidebar = ({ isAuthenticated }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Close sidebar when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isDarkMode = theme != "light";

  // Dynamic classes for themes
  const sidebarWrapperClasses = isDarkMode
    ? "fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transition-transform duration-300 transform"
    : "fixed top-0 left-0 h-full w-64 bg-gray-200 text-gray-900 z-50 transition-transform duration-300 transform";

  const backdropClasses = "fixed inset-0 bg-black opacity-50 z-40";
  const buttonClasses = isDarkMode
    ? "p-2 text-white hover:bg-gray-700 rounded-full"
    : "p-2 text-gray-800 hover:bg-gray-200 rounded-full";

  const menuItemClasses = isDarkMode
    ? "w-full text-left hover:bg-gray-700 px-4 py-2 rounded"
    : "w-full text-left hover:bg-gray-50 px-4 py-2 rounded";

  return (
    <div className="relative">
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className={buttonClasses}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <>
          <div className={backdropClasses}></div>
          <div ref={sidebarRef} className={sidebarWrapperClasses}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Menu</h2>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => (window.location.href = "/protected")}
                    className={menuItemClasses}
                  >
                    Dashboard
                  </button>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <button
                        onClick={() => (window.location.href = "/protected/albums")}
                        className={menuItemClasses}
                      >
                        Albums
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => (window.location.href = "/protected/users")}
                        className={menuItemClasses}
                      >
                        Users
                      </button>
                    </li>
                    <li>
                      <SubmitButton
                        onClick={signOutAction}
                        className="w-full text-left px-4 py-2 rounded"
                      >
                        Sign Out
                      </SubmitButton>
                    </li>
                  </>
                ) : (
                  <li>
                    <SubmitButton
                      onClick={() => (window.location.href = "/sign-in")}
                      className="w-full text-left px-4 py-2 rounded"
                    >
                      Sign In
                    </SubmitButton>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
