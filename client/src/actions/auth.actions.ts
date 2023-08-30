export interface LoginI {
  email: string;
  otp: string;
  firstName?: string;
  lastName?: string;
}

export const RESPONSE_MESSAGES = {
  success: "success",
  error: "something went wrong",
};

export const authActions = () => {
  const requestOTP = async (email: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/set-otp`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.message;
  };

  const login = async (creds: LoginI) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(creds),
        }
      );
      const data = await res.json();
      if (res.status !== 200 || data.message !== RESPONSE_MESSAGES.success) {
        return data;
      }
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    return true;
  };
  return {
    requestOTP,
    login,
    logout,
  };
};
