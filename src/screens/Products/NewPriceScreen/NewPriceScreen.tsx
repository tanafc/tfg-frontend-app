import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { useShop } from "../../../hooks/useShop";
import { NewPriceScreenNavigationProps } from "../../../models/Navigation";
import { ShopLocationData } from "../../../models/Shop";
import { isNumeric } from "../../../utils/isNumeric";

const NewPriceScreen = ({
  route,
  navigation,
}: NewPriceScreenNavigationProps) => {
  const [newPrice, setNewPrice] = useState("");
  const [searchShop, setSearchShop] = useState("");
  const [shopSelected, setShopSelected] = useState<string>("");
  const [shops, setShops] = useState<ShopLocationData[]>([]);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const { barcode, name, brand } = route.params;

  const { getAllShops, postShopPrice } = useShop();

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (searchShop) {
        try {
          const response = await getAllShops(searchShop);

          setShops([...response.data.shops]);
        } catch (error) {
          Alert.alert("Unexpected error");
          console.log(error);
        }
      }
    }, 250);

    return () => clearTimeout(debounce);
  }, [searchShop]);

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
    shopSelected && shopSelected !== "default" && isNumeric(newPrice);

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

        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <View style={[styles.inputRow, { maxWidth: 76 }]}>
              <Text style={styles.bodyText}>💶 Price :</Text>
              <CustomInput
                value={newPrice}
                onChangeText={setNewPrice}
                placeholder="0.00"
              />
              <Text style={styles.bodyText}>€</Text>
            </View>

            <Text style={styles.bodyText}>🛒 Supermarket:</Text>
            <View style={{ marginTop: 5 }}>
              <CustomInput
                value={searchShop}
                onChangeText={setSearchShop}
                placeholder="Super Cool Market"
              />
            </View>
          </View>

          {!!searchShop && (
            <Picker
              selectedValue={shopSelected}
              onValueChange={(itemValue) => setShopSelected(itemValue)}
            >
              <Picker.Item
                key={"default"}
                label={"Select a supermarket"}
                value={"default"}
              />

              {shops.map((shop) => (
                <Picker.Item
                  key={shop.name}
                  label={shop.name}
                  value={shop.name}
                />
              ))}

              <Picker.Item
                key={"notFound"}
                label={"I can't find it"}
                value={"notFound"}
              />
            </Picker>
          )}

          <View style={styles.buttonView}>
            <CustomButton
              text="Update"
              onPress={handlePush}
              disabled={!isValid}
              loading={loadingUpload}
            ></CustomButton>
          </View>
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
    flexDirection: "row",
    alignItems: "center",
  },

  buttonView: {
    marginTop: 12,
  },
});
