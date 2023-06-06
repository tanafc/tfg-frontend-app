import { getReceiptsHttp } from "../api/receipts/getReceiptsHttp";
import { useAuth } from "../context/AuthContext";

export const useReceipt = () => {
  const { account } = useAuth();

  return {
    getProductReceipts: (barcode: string) =>
      getReceiptsHttp({
        accessToken: account.accessToken,
        product: barcode,
      }),
  };
};
