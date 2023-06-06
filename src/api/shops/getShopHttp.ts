import { ShopData } from "../../models/Shop";
import httpClient from "../httpClient";

interface ShopHttp extends ShopData {
  accessToken: string;
}

export const getShopHttp = async ({
  name,
  accessToken,
}: ShopHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().get("/shops", {
    headers: { authorization: token },
    params: { name: name },
  });
};
