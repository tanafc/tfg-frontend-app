import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ProductData } from "../models/Product";

type ProductContextType = {
  products: ProductData[];
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
};

const ProductContext = createContext<ProductContextType>(
  null as unknown as ProductContextType
);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductData[]>([]);

  const value = {
    products,
    setProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (context == null) {
    throw new Error(
      "useProductContext must be used within an ProductProvider"
    );
  }

  return context;
};
