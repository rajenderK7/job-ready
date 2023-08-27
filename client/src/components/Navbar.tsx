import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border border-gray-200 shadow-md mb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <h1 className="text-xl">🚀</h1>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-pink-600">
            Job Ready
          </span>
        </a>
        <div className="font-medium space-x-4">
          <Link to="/my-interviews">My Interviews</Link>
          <Link to="/my-interviews">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
