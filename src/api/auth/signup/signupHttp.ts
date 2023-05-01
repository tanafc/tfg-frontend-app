import httpClient from "../../httpClient";

interface authSignup {
  username: string;
  email: string;
  password: string;
}

export const signupHttp = async ({ username, email, password }: authSignup) => {
  return httpClient().post("/signup", {
    username,
    email,
    password,
  });
};