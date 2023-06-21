export type NutriScore = "A" | "B" | "C" | "D" | "E" | "";

export type NutrientsData = {
  energy: string;
  totalFat: string;
  saturatedFat: string;
  totalCarbohydrates: string;
  totalSugars: string;
  protein: string;
  addedSugars?: string;
  transFat?: string;
  salt?: string;
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

export enum Nutrients_Unit {
  ENERGY = "kcal",
  TOTAL_FATS = "g",
  SATURATED_FATS = "g",
  TOTAL_CARBOHYDRATES = "g",
  TOTAL_SUGARS = "g",
  PROTEIN = "g",
  SALT = "g",
  ADDED_SUGARS = "g",
  TRANS_FATS = "g",
  SODIUM = "mg",
  FIBRE = "g",
  CHOLESTEROL = "mg",
  D_VITAMIN = "mcg",
  CALCIUM = "mg",
  IRON = "mg",
  POTASSIUM = "mg",
  PER_FRUIT_VEG = "%",
}

export const MandatoryNutrients = {
  energy: Nutrients.ENERGY,
  totalFat: Nutrients.TOTAL_FATS,
  saturatedFat: Nutrients.SATURATED_FATS,
  totalCarbohydrates: Nutrients.TOTAL_CARBOHYDRATES,
  totalSugars: Nutrients.TOTAL_SUGARS,
  protein: Nutrients.PROTEIN,
}

export const OptionalNutrients = {
  addedSugars: Nutrients.ADDED_SUGARS,
  transFat: Nutrients.TRANS_FATS,
  salt: Nutrients.SALT,
  sodium: Nutrients.SODIUM,
  fibre: Nutrients.FIBRE,
  cholesterol: Nutrients.CHOLESTEROL,
  dVitamin: Nutrients.D_VITAMIN,
  calcium: Nutrients.CALCIUM,
  iron: Nutrients.IRON,
  potassium: Nutrients.POTASSIUM,
  perFruitVeg: Nutrients.PER_FRUIT_VEG,
}

export const NutrientUnits = {
  energy: Nutrients_Unit.ENERGY,
  totalFat: Nutrients_Unit.TOTAL_FATS,
  saturatedFat: Nutrients_Unit.SATURATED_FATS,
  totalCarbohydrates: Nutrients_Unit.TOTAL_CARBOHYDRATES,
  totalSugars: Nutrients_Unit.TOTAL_SUGARS,
  protein: Nutrients_Unit.PROTEIN,
  salt: Nutrients_Unit.SALT,
  addedSugars: Nutrients_Unit.ADDED_SUGARS,
  transFat: Nutrients_Unit.TRANS_FATS,
  sodium: Nutrients_Unit.SODIUM,
  fibre: Nutrients_Unit.FIBRE,
  cholesterol: Nutrients_Unit.CHOLESTEROL,
  dVitamin: Nutrients_Unit.D_VITAMIN,
  calcium: Nutrients_Unit.CALCIUM,
  iron: Nutrients_Unit.IRON,
  potassium: Nutrients_Unit.POTASSIUM,
  perFruitVeg: Nutrients_Unit.PER_FRUIT_VEG,
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
