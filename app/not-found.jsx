import link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 px-6">
      <div className="text-center max-w-lg">
        {/* BIG 404 */}
        <h1 className="text-7xl font-extrabold text-orange-500 drop-shadow">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          Page Not Found
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-500 mt-2">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/books"
            className="border px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Browse Books
          </a>
        </div>
      </div>
    </div>
  );
}
