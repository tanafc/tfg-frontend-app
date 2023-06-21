import { ProductData } from "./Product";

export type Location = {
  latitude: string;
  longitude: string;
  address?: string;
};

export type ShopData = {
  name: string;
  products: ProductData[];
  location: Location;
};

export type ShopNewLocationData = {
  name: string;
  location: Location;
  address?: string;
};

export type ShopLocationData = {
  name: string;
  location: Location;
};

export type ShopNewPriceData = {
  name: string;
  barcode: string;
  price: number;
};
