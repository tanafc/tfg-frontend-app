export type NutriScore = "A" | "B" | "C" | "D" | "E" | "";

export type Nutrients = {
  energy: string;
  totalFat: string;
  saturatedFat: string;
  transFat?: string;
  totalCarbohydrates: string;
  totalSugars: string;
  addedSugars?: string;
  protein: string;
  salt?: string;
  sodium: string;
  fibre?: string;
  perFruitVeg?: string;
  cholesterol?: string;
  dVitamin?: string;
  calcium?: string;
  iron?: string;
  potassium?: string;
};

export type Product = {
  barcode: string;
  name: string;
  brand: string;
  image: string;
  ingredients: string[];
  nutrients: Nutrients;
  beverage: boolean;
  nutriScore: NutriScore;
};
