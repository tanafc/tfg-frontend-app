import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import { ShopLocationData, ShopNewLocationData } from "../../../models/Shop";
import { isNumeric } from "../../../utils/isNumeric";

import * as Location from "expo-location";

const NewPriceScreen = ({
  route,
  navigation,
}: NewPriceScreenNavigationProps) => {
  const [newPrice, setNewPrice] = useState("");
  const [searchShop, setSearchShop] = useState("");
  const [shopSelected, setShopSelected] = useState<string>("");
  const [shops, setShops] = useState<ShopLocationData[]>([]);
  const [newShopName, setNewShopName] = useState<string>("");
  const [newShopLatitude, setNewShopLatitude] = useState<string>("");
  const [newShopLongitude, setNewShopLongitude] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const { barcode, name, brand } = route.params;

  const { getAllShops, postNewShop, postShopPrice } = useShop();

  const isNewShopValid =
    newShopName &&
    newShopLongitude &&
    newShopLongitude &&
    isNumeric(newShopLatitude) &&
    isNumeric(newShopLongitude);

  const isValid =
    isNumeric(newPrice) &&
    ((shopSelected &&
      shopSelected !== "default" &&
      shopSelected !== "notFound") ||
      (shopSelected === "notFound" && isNewShopValid));

  const uploadNewShop = async () => {
    await postNewShop({
      name: newShopName,
      location: {
        latitude: newShopLatitude,
        longitude: newShopLongitude,
      },
    });
  };

  const uploadNewPrice = async () => {
    setLoadingUpload(true);

    try {
      if (shopSelected === "notFound" && isNewShopValid) {
        await uploadNewShop();
      }

      await postShopPrice({
        barcode: barcode,
        name: shopSelected === "notFound" ? newShopName : shopSelected,
        price: parseFloat(newPrice),
      }).then(() => {
        setLoadingUpload(false);
        Alert.alert("Price successfully updated 🥳!");
        navigation.goBack();
      });
    } catch (err) {
      setLoadingUpload(false);
      Alert.alert("Error uploading info...");
      console.log(err);
    }
  };

  const handleLocation = () => {
    setLoadingLocation(true);

    const requestLocation = async () => {
      {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setNewShopLatitude(location.coords.latitude.toString());
        setNewShopLongitude(location.coords.longitude.toString());
        setLoadingLocation(false);
      }
    };

    requestLocation().catch((err) => {
      Alert.alert("Location not allowed");
      setLoadingLocation(false);
    });
  };

  useEffect(() => {
    setLoadingSearch(true);

    const debounce = setTimeout(async () => {
      if (searchShop) {
        try {
          const response = await getAllShops(searchShop);

          setShops([...response.data.shops]);
        } catch (error) {
          Alert.alert("Unexpected error");
          console.log(error);
        }
        setLoadingSearch(false);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchShop]);

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
            <>
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

              {loadingSearch && (
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <ActivityIndicator size="large" color="#f58b54" />
                </View>
              )}
            </>
          )}

          {shopSelected === "notFound" && (
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontWeight: "bold" }}>
                Can you tell us the name of the shop?
              </Text>
              <View style={{ marginTop: 4 }}>
                <CustomInput
                  placeholder="Amazing Market"
                  value={newShopName}
                  onChangeText={setNewShopName}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}> 🗺 Location</Text>
                <View style={{ width: 200, marginLeft: 5 }}>
                  <CustomButton
                    type="secondary"
                    text="📍 Get my location"
                    onPress={handleLocation}
                  />
                </View>
              </View>

              {loadingLocation ? (
                <View style={{ marginTop: 12, marginBottom: 20 }}>
                  <ActivityIndicator size="large" color="#f58b54" />
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="compass-outline"
                      size={20}
                      style={{ marginRight: 5 }}
                    />
                    <View style={{ width: 70 }}>
                      <Text>Latitude:</Text>
                    </View>
                    <View style={{ marginLeft: 10, width: 104 }}>
                      <CustomInput
                        placeholder="9.9999"
                        value={newShopLatitude}
                        onChangeText={setNewShopLatitude}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="compass-outline"
                      size={20}
                      style={{ marginRight: 5 }}
                    />
                    <View style={{ width: 70 }}>
                      <Text>Longitude:</Text>
                    </View>
                    <View style={{ marginLeft: 10, width: 104 }}>
                      <CustomInput
                        placeholder="9.9999"
                        value={newShopLongitude}
                        onChangeText={setNewShopLongitude}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          )}

          <View style={styles.buttonView}>
            <CustomButton
              text="Update"
              onPress={uploadNewPrice}
              disabled={!isValid}
              loading={loadingUpload}
            />
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
