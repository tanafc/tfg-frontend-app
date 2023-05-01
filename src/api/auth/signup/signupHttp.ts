import httpClient from "../../httpClient";

interface authSignup {
  username: string;
  email: string;
  password: string;
}

export const signupHttp = async ({ username, email, password }: authSignup) => {
  const response = httpClient().post("/signup", {
    username,
    email,
    password,
  });

  return response;
};
