import httpClient from "../httpClient";
import { Product } from "../../models/Product";

interface ProductHttp extends Product {
  accessToken: string;
}

export const postProductHttp = async ({
  accessToken,
  ...body
}: ProductHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().post("/products", body, {
    headers: { authorization: token },
  });
};
