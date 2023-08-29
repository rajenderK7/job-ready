import { useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth";

const API_URL = process.env.API_URL!;

export interface LoginI {
  email: string;
  otp: string;
}

export const RESPONSE_MESSAGES = {
  success: "success",
  error: "something went wrong",
};

export const userActions = () => {
  const setAuth = useSetRecoilState(authAtom);

  const login = async (creds: LoginI) => {
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      if (res.status !== 200 || data.message !== RESPONSE_MESSAGES.success) {
        return data.message;
      }
      setAuth(data.user);
      return data.message;
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    return true;
  };
  return {
    login,
    logout,
  };
};
