import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import {
  MandatoryNutrients,
  NutrientsData,
  OptionalNutrients,
  ProductData,
} from "../../../../../models/Product";

type NutrientsProps = {
  product: ProductData;
};

export const Nutrients = ({ product }: NutrientsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoView}>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Brand:</Text>
          <Text style={styles.bodyText}>{product.brand}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Barcode:</Text>
          <Text style={styles.bodyText}>{product.barcode}</Text>
        </View>

        <Text style={styles.labelText}>Ingredients:</Text>
        {product.ingredients.map((ingredient) => (
          <View key={ingredient} style={styles.infoRow}>
            <Ionicons name="chevron-forward-outline" size={25} />
            <Text style={styles.bodyText}>{ingredient}</Text>
          </View>
        ))}

        <Text style={styles.labelText}>Nutrients:</Text>
        {Object.keys(MandatoryNutrients).map((nutrient) => {
          if (product.nutrients[nutrient as keyof NutrientsData] != null) {
            return (
              <View key={nutrient} style={styles.infoRow}>
                <Ionicons name="chevron-forward-outline" size={25} />
                <Text style={[styles.labelText, { width: 130 }]}>
                  {
                    MandatoryNutrients[
                      nutrient as keyof typeof MandatoryNutrients
                    ]
                  }
                  :
                </Text>
                <Text style={styles.bodyText}>
                  {product.nutrients[nutrient as keyof NutrientsData]}
                </Text>
              </View>
            );
          }
        })}

        {Object.keys(OptionalNutrients).map((nutrient) => {
          if (product.nutrients[nutrient as keyof NutrientsData] != null) {
            return (
              <View key={nutrient} style={styles.infoRow}>
                <Ionicons name="chevron-forward-outline" size={25} />
                <Text style={[styles.labelText, { width: 130 }]}>
                  {
                    OptionalNutrients[
                      nutrient as keyof typeof OptionalNutrients
                    ]
                  }
                  :
                </Text>
                <Text style={styles.bodyText}>
                  {product.nutrients[nutrient as keyof NutrientsData]}
                </Text>
              </View>
            );
          }
        })}
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Beverage:</Text>
          <Text style={styles.bodyText}>{product.beverage ? "Yes" : "No"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelText}>NutriScore:</Text>
          <Text style={styles.bodyText}>
            {product.nutriScore === "" ? "Not defined 😓" : product.nutriScore}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Nutrients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDDC7",
  },

  titleView: {
    marginBottom: 5,
    marginTop: 20,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },

  infoView: {
    padding: 20,
    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  labelText: {
    fontWeight: "bold",
    fontSize: 18,
    width: 100,
  },

  bodyText: {
    fontSize: 18,
  },

  buttonView: {
    marginTop: 12,
    marginBottom: 50,
  },
});
