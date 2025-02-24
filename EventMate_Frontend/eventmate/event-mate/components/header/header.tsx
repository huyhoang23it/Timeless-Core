import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaMusic,
  FaCalendarAlt,
  FaGuitar,
  FaEllipsisH,
  FaTicketAlt,
  FaSearch,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const isLoggedIn = false; // Giả lập trạng thái đăng nhập

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setIsLanguageMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Các mục menu cho người dùng khi đã đăng nhập
  const userMenuItems = [
    {
      label: "Your Ticket",
      href: "/your-ticket",
      icon: <FaTicketAlt className="mr-2" />,
    },
    {
      label: "Your Event",
      href: "/your-event",
      icon: <FaCalendarAlt className="mr-2" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <FaUser className="mr-2" />,
    },
    {
      label: "Logout",
      onClick: () => console.log("Logout"),
      icon: <FaSignOutAlt className="mr-2" />,
    },
  ];

  // Các mục menu cho ngôn ngữ
  const languageMenuItems = [
    {
      label: "Vietnamese",
      onClick: () => console.log("Switch to Vietnamese"),
      icon: (
        <span role="img" aria-label="Vietnamese" className="mr-2">
          🇻🇳
        </span>
      ),
    },
    {
      label: "English",
      onClick: () => console.log("Switch to English"),
      icon: (
        <span role="img" aria-label="English" className="mr-2">
          🇬🇧
        </span>
      ),
    },
  ];

  const navItems = [
    { label: "Home", href: "/", icon: <FaHome className="mr-1" /> },
    { label: "Music", href: "/music", icon: <FaMusic className="mr-1" /> },
    { label: "Events", href: "/events", icon: <FaCalendarAlt className="mr-1" /> },
    { label: "Concerts", href: "/concerts", icon: <FaGuitar className="mr-1" /> },
    { label: "Other", href: "/other", icon: <FaEllipsisH className="mr-1" /> },
  ];

  return (
    <>
      {/* Top Row */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="text-2xl font-bold">Event Mate</span>
            </Link>

            {/* Search box kéo dài ra */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-96">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded-full pl-10 pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Các nút bên phải với khoảng cách rộng hơn */}
            <div className="flex items-center space-x-8">
              <Link
                href="/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-lg"
              >
                Create Event
              </Link>

              <Link
                href="/your-ticket"
                className="hover:text-gray-700 flex items-center space-x-1 text-lg"
              >
                <FaTicketAlt />
                <span>Your Ticket</span>
              </Link>

              {/* User Menu */}
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="hover:text-gray-700 flex items-center space-x-1 text-lg"
                  >
                    <span>User Name</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-50 border rounded shadow-md z-50">
                      {userMenuItems.map((item, idx) =>
                        item.href ? (
                          <Link
                            key={idx}
                            href={item.href}
                            className="block px-4 py-2 hover:bg-gray-100 text-left text-lg flex items-center"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <button
                            key={idx}
                            onClick={item.onClick}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-lg flex items-center"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="hover:text-gray-700 text-lg">
                  Login
                </Link>
              )}

              {/* Language Menu */}
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={toggleLanguageMenu}
                  className="hover:text-gray-700 flex items-center space-x-1 text-lg"
                >
                  <span>Vietnamese</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-gray-50 border rounded shadow-md z-50">
                    {languageMenuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={item.onClick}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-lg flex items-center"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation menu full width */}
      <nav className="bg-gray-800 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-start space-x-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="text-white hover:text-gray-300 flex items-center space-x-1 text-md"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
