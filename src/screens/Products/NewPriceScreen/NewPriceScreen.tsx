import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { useShop } from "../../../hooks/useShop";
import { NewPriceScreenNavigationProps } from "../../../models/Navigation";
import { ShopLocationsData } from "../../../models/Shop";
import { Picker } from "@react-native-picker/picker";
import { isNumeric } from "../../../utils/isNumeric";

const NewPriceScreen = ({
  route,
  navigation,
}: NewPriceScreenNavigationProps) => {
  const [newPrice, setNewPrice] = useState("");
  const [shopSelected, setShopSelected] = useState<string>("");
  const [shops, setShops] = useState<ShopLocationsData[]>([
    { name: "Select a supermarket", locations: [] },
  ]);

  const { barcode, name, brand } = route.params;

  const { getAllShops, postShopPrice } = useShop();

  useEffect(() => {
    const fetchShops = async () => {
      const response = await getAllShops();

      setShops([...shops, ...response.data.shops]);
    };

    fetchShops().catch((err) => {
      Alert.alert("Unexpected error");
      console.log(err);
    });
  }, []);

  const handlePush = async () => {
    await postShopPrice({
      barcode: barcode,
      name: shopSelected,
      price: parseFloat(newPrice),
    })
      .then(() => {
        Alert.alert("Price successfully updated 🥳!");
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert("Error...");
        console.log(err);
      });
  };

  const isValid =
    shopSelected &&
    shopSelected !== "Select a supermarket" &&
    isNumeric(newPrice);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>New price</Text>
        <Text>
          {name}, {brand}
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <Text>💸 Price (Euros):</Text>
            <CustomInput
              value={newPrice}
              onChangeText={setNewPrice}
              placeholder="0.0"
            />
          </View>
          <View style={styles.inputView}>
            <Text>🛒 Supermarket:</Text>
            <Picker
              selectedValue={shopSelected}
              onValueChange={(itemValue) => setShopSelected(itemValue)}
            >
              {shops.map((shop) => (
                <Picker.Item
                  key={shop.name}
                  label={shop.name}
                  value={shop.name}
                />
              ))}
            </Picker>
          </View>
          <CustomButton
            text="Publish"
            onPress={handlePush}
            disabled={!isValid}
          ></CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPriceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDDC7",
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },

  inputContainer: {
    marginTop: 15,
    width: "70%",
  },

  inputView: {
    marginTop: 10,
  },
});
