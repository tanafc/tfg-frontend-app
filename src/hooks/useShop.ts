import { getAllShopsHttp } from "../api/shops/getAllShopsHttp";
import { postShopPriceHttp } from "../api/shops/postShopPriceHttp";
import { useAuth } from "../context/AuthContext";
import { ShopNewPriceData } from "../models/Shop";

export const useShop = () => {
  const { account } = useAuth();

  return {
    getAllShops: (name: string = "") =>
      getAllShopsHttp({
        accessToken: account.accessToken,
        name: name,
      }),

    postShopPrice: ({ name, barcode, price }: ShopNewPriceData) =>
      postShopPriceHttp({
        accessToken: account.accessToken,
        name: name,
        barcode: barcode,
        price: price,
      }),
  };
};
