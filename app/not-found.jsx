"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 px-6">
      <div className="text-center max-w-lg">

        <h1 className="text-7xl font-extrabold text-orange-500 drop-shadow">
          404
        </h1>

        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/books"
            className="border px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}