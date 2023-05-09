import httpClient from "../httpClient";

interface AccountHttp {
  username: string;
  accessToken: string;
}

export const getAccountHttp = async ({ username, accessToken }: AccountHttp) => {
  const token = "Bearer " + accessToken;

  const res = await httpClient().get("/account", {
    params: { username: username },
    headers: { authorization: token },
  });

  return res
};
