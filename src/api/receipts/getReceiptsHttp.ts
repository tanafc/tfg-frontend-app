import httpClient from "../httpClient";

interface ReceiptHttp {
  accessToken: string;
  product?: string;
  shop?: string;
  sdate?: string;
  edate?: string;
  minprice?: string;
  maxprice?: string;
  limit?: string;
  skip?: string;
}

export const getReceiptsHttp = async ({
  accessToken,
  ...params
}: ReceiptHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().get("/receipts", {
    headers: { authorization: token },
    params: params,
  });
};