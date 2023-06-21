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
import { ProductScreenNavigationProps } from "../../../models/Navigation";
import { ProductData } from "../../../models/Product";
import Nutrients from "./components/Nutrients";
import Prices from "./components/Prices/Prices";
import Locations from "./components/Locations/Locations";

const ProductScreen = ({ route, navigation }: ProductScreenNavigationProps) => {
  const { barcode } = route.params;

  const [product, setProduct] = useState<ProductData | undefined>(undefined);

  const [tab, setTab] = useState<"nutrients" | "prices" | "locations">(
    "nutrients"
  );

  const isFocused = useIsFocused();

  const { getProduct } = useProduct();

  useEffect(() => {
    if (isFocused) {
      const fetchProduct = async () => {
        const response = await getProduct(barcode);

        setProduct(response.data);
      };

      fetchProduct().catch((err) => {
        Alert.alert("Unexpected error");
        console.log(err);
      });
    }
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: "#DFDDC7" }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        <View style={{ width: "30%" }}>
          <CustomButton
            disabled={tab === "nutrients"}
            text="Nutrients"
            onPress={() => {
              setTab("nutrients");
            }}
          />
        </View>
        <View style={{ width: "30%" }}>
          <CustomButton
            text="Prices"
            disabled={tab === "prices"}
            onPress={() => {
              setTab("prices");
            }}
          />
        </View>
        <View style={{ width: "30%" }}>
          <CustomButton
            text="Locations"
            disabled={tab === "locations"}
            onPress={() => {
              setTab("locations");
            }}
          />
        </View>
      </View>

      {!product ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#f58b54" />
        </View>
      ) : (
        <View style={{ marginBottom: 30 }}>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{product.name}</Text>
            </View>
            {tab === "nutrients" && <Nutrients product={product} />}

            {tab === "prices" && (
              <Prices product={product} navigation={navigation} />
            )}

            {tab === "locations" && <Locations product={product} />}
          </View>
        </View>
      )}
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
});

export default ProductScreen;
