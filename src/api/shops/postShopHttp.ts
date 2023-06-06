import { ShopNewLocationData } from "../../models/Shop";
import httpClient from "../httpClient";

interface ShopHttp extends ShopNewLocationData {
  accessToken: string;
}

export const postShopHttp = async ({
  name,
  location,
  accessToken,
}: ShopHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().post("/shops", {
    headers: { authorization: token },
    params: { name: name },
    data: { location: location },
  });
};
