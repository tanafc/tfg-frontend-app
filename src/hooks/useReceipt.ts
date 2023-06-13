import { getNewestReceiptsHttp } from "../api/receipts/getNewestReceiptsHttp";
import { getReceiptsHttp } from "../api/receipts/getReceiptsHttp";
import { useAuth } from "../context/AuthContext";

export const useReceipt = () => {
  const { account } = useAuth();

  return {
    getProductReceipts: (barcode: string, shop: string) =>
      getReceiptsHttp({
        accessToken: account.accessToken,
        product: barcode,
        shop: shop
      }),

    getNewestProductReceipts: (barcode: string) =>
      getNewestReceiptsHttp({
        accessToken: account.accessToken,
        product: barcode,
      }),
  };
};
