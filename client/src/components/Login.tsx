import { useState } from "react";
import CustomLoading from "./CustomLoading";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [sentOTP, setSentOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const handleReqOTP = async (e: any) => {
    if (sentOTP) {
      // TODO: Validate and login
      return;
    }
    e.preventDefault();
    console.log(email);
    setLoading(true);
    // TODO: Get OTP from the server
    // setOTP(otp);
    setSentOTP(true);
    setLoading(false);
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const otpHandler = (e: any) => {
    setOTP(e.target.value);
  };

  return (
    <div>
      <section className="bg-gray-50 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                {sentOTP && (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
        </div>
      </section>
    </div>
  );
};

export default Login;
