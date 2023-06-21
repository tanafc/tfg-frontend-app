export type ReceiptData = {
  _id: string;
  price: number;
  product: {
    barcode: string;
    name: string;
  };
  shop: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  date: string;
};
