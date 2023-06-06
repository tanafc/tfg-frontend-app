import httpClient from "../httpClient";
import { ShopNewPriceData } from "../../models/Shop";

interface ShopPriceHttp extends ShopNewPriceData {
  accessToken: string;
}

export const postShopPriceHttp = async ({
  accessToken,
  name,
  ...body
}: ShopPriceHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().post("/shops/products", body, {
    params: { name: name },
    headers: { authorization: token },
  });
};
