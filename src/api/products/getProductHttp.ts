import httpClient from "../httpClient";

interface ProductHttp {
  barcode: string;
  accessToken: string;
}

export const getProductHttp = async ({
  barcode,
  accessToken,
}: ProductHttp) => {
  const token = "Bearer " + accessToken;

  const res = await httpClient().get("/products", {
    params: { barcode: barcode },
    headers: { authorization: token },
  });
  return res;

};
