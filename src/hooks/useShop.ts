import { getAllShopsHttp } from "../api/shops/getAllShopsHttp";
import { postShopHttp } from "../api/shops/postShopHttp";
import { postShopPriceHttp } from "../api/shops/postShopPriceHttp";
import { useAuth } from "../context/AuthContext";
import { ShopNewLocationData, ShopNewPriceData } from "../models/Shop";

export const useShop = () => {
  const { account } = useAuth();

  return {
    getAllShops: (name: string = "") =>
      getAllShopsHttp({
        accessToken: account.accessToken,
        name: name,
      }),

    postNewShop: ({ name, location }: ShopNewLocationData) =>
      postShopHttp({
        accessToken: account.accessToken,
        name: name,
        location: location,
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
