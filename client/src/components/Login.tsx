import { useState, useEffect } from "react";
import CustomLoading from "./CustomLoading";
import toast from "react-hot-toast/headless";
import { authActions } from "../actions/auth.actions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sentOTP, setSentOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const user = useRecoilValue(authAtom);

  useEffect(() => {
    if (user.email) {
      navigate("/");
      return;
    }
  }, []);

  const handleReqOTP = async (e: any) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email field is required");
      return;
    }
    if (sentOTP) {
      const res = await authActions().login({
        email: email,
        otp: OTP,
        firstName,
        lastName,
      });
      if (res.message === "success") {
        setAuth(res.user);
        navigate("/");
        return;
      } else {
        toast.error(res.message);
        setLoading(false);
        setOTP("");
        setSentOTP(false);
        return;
      }
    }
    setLoading(true);
    const res = await authActions().requestOTP(email.trim());
    if (res == "otp sent") {
      setSentOTP(true);
    }
    setLoading(false);
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const firstNameHandler = (e: any) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e: any) => {
    setLastName(e.target.value);
  };

  const otpHandler = (e: any) => {
    setOTP(e.target.value);
  };

  return (
    <section className="flex flex-col justify-center items-center mx-auto">
      <p className="flex items-center mb-6 text-2xl font-semibold text-pink-600">
        Welcome to Job Ready 🚀
      </p>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-pink-600 md:text-2xl">
            Login or Sign Up
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleReqOTP}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-pink-600"
              >
                Email
              </label>
              <input
                onChange={emailHandler}
                type="email"
                name="email"
                id="email"
                value={email}
                className="bg-pink-50 border border-pink-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5  mb-4"
                placeholder="batman@gotham.city"
                required
              />
            </div>
            {signup && (
              <>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-pink-600"
                  >
                    First Name
                  </label>
                  <input
                    onChange={firstNameHandler}
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    className="bg-pink-50 border border-pink-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5  mb-4"
                    placeholder="Bruce"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-pink-600"
                  >
                    Last Name
                  </label>
                  <input
                    onChange={lastNameHandler}
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    className="bg-pink-50 border border-pink-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5  mb-4"
                    placeholder="Wayne"
                  />
                </div>
              </>
            )}
            {sentOTP && (
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-pink-600"
                >
                  OTP
                </label>
                <input
                  onChange={otpHandler}
                  type="number"
                  name="password"
                  id="otp"
                  placeholder="XXXXXX"
                  className="bg-pink-50 border border-pink-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5  mb-4"
                  required
                />
              </div>
            )}
            {signup ? (
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setSignup(!signup)}
                  className="text-pink-600 hover:cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => setSignup(!signup)}
                  className="text-pink-600 hover:cursor-pointer hover:underline"
                >
                  Create
                </span>
              </p>
            )}
            {loading ? (
              <CustomLoading />
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                <p>{sentOTP ? "Continue" : "Request OTP"}</p>
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
