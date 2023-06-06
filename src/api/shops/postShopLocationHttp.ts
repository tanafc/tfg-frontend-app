import httpClient from "../httpClient";
import { ShopNewLocationData } from "../../models/Shop";

interface ShopLocationHttp extends ShopNewLocationData {
  accessToken: string;
}

export const postProductHttp = async ({
  accessToken,
  ...body
}: ShopLocationHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().post("/shops/locations", body, {
    headers: { authorization: token },
    params: {
      name: body.name,
    },
  });
};
