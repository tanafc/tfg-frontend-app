import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const [loadingShops, setLoadingShops] = useState(true);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const { barcode, name, brand } = route.params;

  const { getAllShops, postShopPrice } = useShop();

  useEffect(() => {
    const fetchShops = async () => {
      const response = await getAllShops();

      setShops([...shops, ...response.data.shops]);
      setLoadingShops(false);
    };

    fetchShops().catch((err) => {
      setLoadingShops(false);
      Alert.alert("Unexpected error");
      console.log(err);
    });
  }, []);

  const handlePush = async () => {
    setLoadingUpload(true);

    await postShopPrice({
      barcode: barcode,
      name: shopSelected,
      price: parseFloat(newPrice),
    })
      .then(() => {
        setLoadingUpload(false);
        Alert.alert("Price successfully updated 🥳!");
        navigation.goBack();
      })
      .catch((err) => {
        setLoadingUpload(false);
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
        <Text style={styles.labelText}>
          {name}, {brand}
        </Text>
        {loadingShops ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator size="large" color="#f58b54" />
          </View>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <View style={styles.inputView}>
                <View style={styles.inputRow}>
                  <Text style={styles.bodyText}>💶 Price :</Text>
                  <CustomInput
                    value={newPrice}
                    onChangeText={setNewPrice}
                    placeholder="0.00"
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.bodyText}>🛒 Supermarket:</Text>
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
              <View style={styles.buttonView}>
                <CustomButton
                  text="Update"
                  onPress={handlePush}
                  disabled={!isValid}
                  loading={loadingUpload}
                ></CustomButton>
              </View>
            </View>
          </>
        )}
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

  labelText: {
    fontWeight: "bold",
    fontSize: 18,
  },

  bodyText: {
    fontSize: 18,
  },

  inputContainer: {
    marginTop: 15,
    width: "70%",
  },

  inputView: {
    marginTop: 10,
  },

  inputRow: {
    gap: 8,
    maxWidth: 188,
    flexDirection: "row",
    alignItems: "center"
  },

  buttonView: {
    marginTop: 12,
  },
});
