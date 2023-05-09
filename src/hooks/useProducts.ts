import { getProductHttp } from "../api/products/getProductHttp";
import { postProductHttp } from "../api/products/postProductHttp";
import { useAuth } from "../context/AuthContext";
import { Product } from "../models/Product";

export const useProduct = () => {
  const { account } = useAuth();

  return {
    getProduct: (barcode: string) =>
      getProductHttp({
        accessToken: account.accessToken,
        barcode: barcode,
      }),

    postProduct: (product: Product) =>
      postProductHttp({
        accessToken: account.accessToken,
        ...product,
      }),
  };
};
