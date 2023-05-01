import httpClient from "../../httpClient";

interface authLogin {
  username: string;
  password: string;
}

export const loginHttp = async ({ username, password }: authLogin) => {
  const response = await httpClient().post("/login", {
    username,
    password,
  });

  return response;
};
