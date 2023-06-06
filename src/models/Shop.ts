import { ProductData } from "./Product";

export type Location = {
  latitude: string;
  longitude: string;
  address: string;
};

export type ShopData = {
  name: string;
  products: ProductData[];
  locations: Location[];
};

export type ShopNewLocationData = {
  name: string;
  location: Location;
};

export type ShopLocationsData = {
  name: string;
  locations: Location[];
};

export type ShopNewPriceData = {
  name: string;
  barcode: string;
  price: number;
};
