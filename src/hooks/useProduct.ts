import { getAllProductsHttp } from "../api/products/getAllProductsHttp";
import { getProductHttp } from "../api/products/getProductHttp";
import { postProductHttp } from "../api/products/postProductHttp";
import { useAuth } from "../context/AuthContext";
import { ProductData } from "../models/Product";

export const useProduct = () => {
  const { account } = useAuth();

  return {
    getProduct: (barcode: string) =>
      getProductHttp({
        accessToken: account.accessToken,
        barcode: barcode,
      }),

    getAllProducts: (name: string) =>
      getAllProductsHttp({
        accessToken: account.accessToken,
        name: name,
      }),

    postProduct: (product: ProductData) =>
      postProductHttp({
        accessToken: account.accessToken,
        ...product,
      }),
  };
};
