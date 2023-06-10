import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import { useProduct } from "../../../hooks/useProduct";
import { useReceipt } from "../../../hooks/useReceipt";
import { ProductScreenNavigationProps } from "../../../models/Navigation";
import {
  MandatoryNutrients,
  NutrientsData,
  OptionalNutrients,
  ProductData,
} from "../../../models/Product";
import { ReceiptData } from "../../../models/Receipt";
import { formatDate } from "../../../utils/formatDate";

const ProductScreen = ({ route, navigation }: ProductScreenNavigationProps) => {
  const [product, setProduct] = useState<ProductData | undefined>(undefined);
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [receiptsLoaded, setReceiptsLoaded] = useState(false);

  const { barcode } = route.params;

  const { getProduct } = useProduct();
  const { getNewestProductReceipts } = useReceipt();

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProduct(barcode);

      setProduct(response.data);
    };

    fetchProduct().catch((err) => {
      Alert.alert("Unexpected error");
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      setReceiptsLoaded(false);

      const fetchReceipts = async () => {
        const response = await getNewestProductReceipts(barcode);

        setReceipts([...response.data.receipts]);
        setReceiptsLoaded(true);
      };

      fetchReceipts().catch((err) => {
        Alert.alert("Unexpected error");
        console.log(err);
      });
    }
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        {product != undefined ? (
          <>
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
                if (
                  product.nutrients[nutrient as keyof NutrientsData] != null
                ) {
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
                if (
                  product.nutrients[nutrient as keyof NutrientsData] != null
                ) {
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
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Prices:</Text>
            </View>
            {receiptsLoaded ? (
              <>
                {receipts.length === 0 ? (
                  <View style={{ alignItems: "center" }}>
                    <Text>No data found 😥</Text>
                  </View>
                ) : (
                  <View style={styles.infoView}>
                    {receipts.map((receipt) => (
                      <View key={receipt._id} style={styles.infoRow}>
                        <Text style={[styles.labelText, { width: 90 }]}>
                          {receipt.shop.name}:
                        </Text>
                        <Text style={[styles.bodyText, { width: 50 }]}>
                          {receipt.price}€
                        </Text>
                        <Text style={styles.bodyText}>
                          {formatDate(new Date(receipt.date))}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
                <View style={styles.buttonView}>
                  <CustomButton
                    text="Update price"
                    onPress={() =>
                      navigation.navigate("NewPriceScreen", {
                        barcode: barcode,
                        name: product.name,
                        brand: product.brand,
                      })
                    }
                  />
                </View>
              </>
            ) : (
              <ActivityIndicator size="large" color="#f58b54" />
            )}
          </>
        ) : (
          <ActivityIndicator size="large" color="#f58b54" />
        )}
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

export default ProductScreen;
