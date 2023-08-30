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
      navigate("/login", {
        replace: true,
      });
      return;
    }
  };
  return (
    <nav className="bg-white border border-pink-400 shadow-md mb-4">
      <div className="max-w-screen-xl flex flex-col lg:flex-row lg:flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center md:mb-0">
          <h1 className="text-xl">🚀</h1>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-pink-600">
            Job Ready
          </span>
        </Link>
        {user?.email && (
          <div className="font-medium w-full flex lg:w-auto lg:relative lg:space-x-4 justify-evenly mt-2">
            <Link to="/my-interviews" className="hover:text-pink-600">
              My Interviews
            </Link>

            {user?.email ? (
              <>
                <span>
                  Hi,{" "}
                  <strong className="text-pink-600">{user?.firstName}</strong>
                </span>
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
