import { ShopNewLocationData } from "../../models/Shop";
import httpClient from "../httpClient";

interface ShopHttp extends ShopNewLocationData {
  accessToken: string;
}

export const postShopHttp = async ({ accessToken, ...body }: ShopHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().post("/shops", body, {
    headers: { authorization: token },
  });
};
