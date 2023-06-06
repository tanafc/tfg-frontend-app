import httpClient from "../httpClient";

interface AllProductsHttp {
  name: string;
  accessToken: string;
}

export const getAllProductsHttp = async ({
  name,
  accessToken,
}: AllProductsHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().get("/products-all", {
    params: { name: name },
    headers: { authorization: token },
  });
};
