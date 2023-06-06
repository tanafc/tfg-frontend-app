import httpClient from "../httpClient";

interface ShopHttp {
  name: string;
  accessToken: string;
}

export const getAllShopsHttp = async ({ name, accessToken }: ShopHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().get("/shops-all", {
    headers: { authorization: token },
    params: { name: name },
  });
};
