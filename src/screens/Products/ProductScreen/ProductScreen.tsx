import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import { useProductContext } from "../../../context/ProductContext";
import { ProductScreenNavigationProps } from "../../../models/Navigation";
import {
  MandatoryNutrients,
  NutrientsData,
  OptionalNutrients,
  ProductData,
} from "../../../models/Product";
import { useEffect, useState } from "react";
import { useReceipt } from "../../../hooks/useReceipt";
import { ReceiptData } from "../../../models/Receipt";

const ProductScreen = ({ route, navigation }: ProductScreenNavigationProps) => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [receiptsLoaded, setReceiptsLoaded] = useState(false);

  const { barcode } = route.params;

  const { products, setProducts } = useProductContext();

  const product = products.find(
    (element) => element.barcode === barcode
  ) as ProductData;

  const { getProductReceipts } = useReceipt();

  useEffect(() => {
    const fetchReceipts = async () => {
      const response = await getProductReceipts(barcode);

      setReceipts([...response.data.receipts]);
      setReceiptsLoaded(true);
    };

    fetchReceipts().catch((err) => {
      Alert.alert("Unexpected error");
      console.log(err);
    });
  }, []);

  console.log({ receipts });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{product.name}</Text>
        </View>

        <View style={styles.infoView}>
          <View style={styles.infoRow}>
            <Text style={styles.labelText}>Brand:</Text>
            <Text style={styles.bodyText}>{product.brand}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.labelText}>Barcode:</Text>
            <Text style={styles.bodyText}>{barcode}</Text>
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
                  <Text style={styles.labelText}>
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
                  <Text style={styles.labelText}>
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
            <Text style={styles.bodyText}>
              {product.beverage ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.labelText}>NutriScore:</Text>
            <Text style={styles.bodyText}>
              {product.nutriScore === ""
                ? "Not defined 😓"
                : product.nutriScore}
            </Text>
          </View>

          <Text style={styles.labelText}>Prices:</Text>
          {receiptsLoaded &&
            (receipts.length === 0 ? (
              <View style={{alignItems:"center"}}>
                <Text >No data found 😥</Text>
              </View>
            ) : (
              <View style={styles.infoView}>
                <Text style={styles.bodyText}>
                  {receipts.map((receipt) => (
                    <View key={receipt._id}>
                      <Text>Shop: {receipt.shop.name}</Text>
                      <Text>Price: {receipt.price}€</Text>
                      <Text>Date: {receipt.date}</Text>
                      <Text></Text>
                    </View>
                  ))}
                </Text>
              </View>
            ))}
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            text="Add new price"
            onPress={() =>
              navigation.navigate("NewPriceScreen", {
                barcode: barcode,
                name: product.name,
                brand: product.brand,
              })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDDC7",
  },

  titleView: {
    marginBottom: 5,
    marginTop: 50,
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
  },

  bodyText: {
    fontSize: 15,
  },

  buttonView: {
    width: "60%",
    marginBottom: 50,
  },
});

export default ProductScreen;
