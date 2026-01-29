import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
        
        <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Component Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          Oops! This page you are looking for it doesn’t exist.
        </p>

        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
