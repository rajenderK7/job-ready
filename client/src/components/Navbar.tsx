import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth";
import { authActions } from "../actions/auth.actions";

const Navbar = () => {
  const user = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const handleLogout = () => {
    if (authActions().logout()) {
      setAuth(JSON.stringify({}));
      navigate("/login");
      return;
    }
  };
  return (
    <nav className="bg-white border border-gray-200 shadow-md mb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl">🚀</h1>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-pink-600">
            Job Ready
          </span>
        </Link>
        <div className="font-medium space-x-4">
          <Link to="/my-interviews" className="hover:text-pink-600">
            My Interviews
          </Link>
          <Link to="/my-interviews" className="hover:text-pink-600">
            Profile
          </Link>

          {user?.email ? (
            <>
              <strong>{user?.email}</strong>
              <button onClick={handleLogout} className="hover:text-pink-600">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-pink-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
