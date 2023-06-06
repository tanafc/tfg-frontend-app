export type NutriScore = "A" | "B" | "C" | "D" | "E" | "";

export type NutrientsData = {
  energy: string;
  totalFat: string;
  saturatedFat: string;
  totalCarbohydrates: string;
  totalSugars: string;
  protein: string;
  salt: string;
  addedSugars?: string;
  transFat?: string;
  sodium?: string;
  fibre?: string;
  cholesterol?: string;
  dVitamin?: string;
  calcium?: string;
  iron?: string;
  potassium?: string;
  perFruitVeg?: string;
};

export enum Nutrients {
  ENERGY = "Energy",
  TOTAL_FATS = "Total fats",
  SATURATED_FATS = "Saturated fats",
  TOTAL_CARBOHYDRATES = "Total carbohydrates",
  TOTAL_SUGARS = "Total sugars",
  PROTEIN = "Protein",
  SALT = "Salt",
  ADDED_SUGARS = "Added suggars",
  TRANS_FATS = "Trans fats",
  SODIUM = "Sodium",
  FIBRE = "Fibre",
  CHOLESTEROL = "Cholesterol",
  D_VITAMIN = "D vitamin",
  CALCIUM = "Calcium",
  IRON = "Iron",
  POTASSIUM = "Potassium",
  PER_FRUIT_VEG = "% fruits & vegetables",
}

export const MandatoryNutrients = {
  energy: Nutrients.ENERGY,
  totalFat: Nutrients.TOTAL_FATS,
  saturatedFat: Nutrients.SATURATED_FATS,
  totalCarbohydrates: Nutrients.TOTAL_CARBOHYDRATES,
  totalSugars: Nutrients.TOTAL_SUGARS,
  protein: Nutrients.PROTEIN,
  salt: Nutrients.SALT,
}

export const OptionalNutrients = {
  addedSugars: Nutrients.ADDED_SUGARS,
  transFat: Nutrients.TRANS_FATS,
  sodium: Nutrients.SODIUM,
  fibre: Nutrients.FIBRE,
  cholesterol: Nutrients.CHOLESTEROL,
  dVitamin: Nutrients.D_VITAMIN,
  calcium: Nutrients.CALCIUM,
  iron: Nutrients.IRON,
  potassium: Nutrients.POTASSIUM,
  perFruitVeg: Nutrients.PER_FRUIT_VEG,
}

export type ProductData = {
  barcode: string;
  name: string;
  brand: string;
  image: string;
  ingredients: string[];
  nutrients: NutrientsData;
  beverage: boolean;
  nutriScore: NutriScore;
};

export type ProductName = {
  barcode: string;
  name: string;
  brand: string;
  image: string;
};
