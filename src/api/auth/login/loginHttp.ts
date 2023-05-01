import httpClient from "../../httpClient";

interface authLogin {
  username: string;
  password: string;
}

export const loginHttp = async ({ username, password }: authLogin) => {
  return httpClient().post("/login", {
    username,
    password,
  });
};
