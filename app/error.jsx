"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">

        {/* ICON */}
        <div className="text-6xl mb-4">⚠️</div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Please try again.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center">

          <button
            onClick={() => reset()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Try Again
          </button>

          <a
            href="/"
            className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Go Home
          </a>

        </div>

      </div>
    </div>
  );
}