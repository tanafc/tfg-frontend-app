import httpClient from "../httpClient";

interface NewestReceiptsHttp {
  accessToken: string;
  product: string;
}

export const getNewestReceiptsHttp = async ({
  accessToken,
  ...params
}: NewestReceiptsHttp) => {
  const token = "Bearer " + accessToken;

  return await httpClient().get("/newest-receipts", {
    headers: { authorization: token },
    params: params,
  });
};