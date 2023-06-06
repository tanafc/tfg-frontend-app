import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import { useProduct } from "../../hooks/useProduct";
import { SearchScreenNavigationProps } from "../../models/Navigation";
import { ProductName } from "../../models/Product";
import { useProductContext } from "../../context/ProductContext";

const SearchScreen = ({ navigation }: SearchScreenNavigationProps) => {
  const [searchName, setSearchName] = useState<string>("");
  const [productList, setProductList] = useState<ProductName[]>([]);

  const { getAllProducts, getProduct } = useProduct();
  const { products, setProducts } = useProductContext();

  const handleOnPress = async (barcode: string) => {
    try {
      if (!products.some((product) => product.barcode === barcode)) {
        const response = await getProduct(barcode);

        setProducts([...products, response.data]);
      }

      navigation.navigate("Product", {
        screen: "ProductScreen",
        params: { barcode: barcode },
      });
    } catch (error) {
      Alert.alert("Unexpected error");
      console.log(error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (searchName) {
        try {
          const response = await getAllProducts(searchName);

          if (response.data.products) {
            setProductList([...response.data.products]);
          }
        } catch (error) {
          Alert.alert("Unexpected error");
          console.log(error);
        }
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchName]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Search for a product! 🛒</Text>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={25} />
          <CustomInput
            value={searchName}
            onChangeText={setSearchName}
            placeholder="Super Awesome Cookies"
          ></CustomInput>
        </View>
        <View style={styles.productList}>
          {productList.map((product) => (
            <Pressable
              key={product.barcode}
              style={styles.productRow}
              onPress={() => handleOnPress(product.barcode)}
            >
              <Ionicons name="arrow-redo" size={25} color="tomato" />
              <Text style={styles.productText}>
                {product.name}, {product.brand}
              </Text>
            </Pressable>
          ))}
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
    marginBottom: 15,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },

  productList: {
    width: "80%",
  },

  productRow: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  productText: {
    fontSize: 16,
  },

  searchBar: {
    width: "70%",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchScreen;
