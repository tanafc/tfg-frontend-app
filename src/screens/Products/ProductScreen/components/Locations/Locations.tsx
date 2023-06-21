import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../../../../components/CustomMarker/CustomMarker";
import { useReceipt } from "../../../../../hooks/useReceipt";
import { ProductData } from "../../../../../models/Product";
import { ReceiptData } from "../../../../../models/Receipt";

import * as Location from "expo-location";

type LocationsProps = {
  product: ProductData;
};

const Locations = ({ product }: LocationsProps) => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [locationGranted, setLocationGranted] = useState<boolean | undefined>(
    undefined
  );
  const [initialRegion, setInitialRegion] = useState({
    latitude: 28.27292,
    longitude: -16.64257,
    latitudeDelta: 4,
    longitudeDelta: 4,
  });

  const { getNewestProductReceipts } = useReceipt();

  const isFocused = useIsFocused();

  const minPriceShop =
    loaded && receipts.length !== 0
      ? receipts.reduce((prev, curr) => (prev.price < curr.price ? prev : curr))
      : undefined;

  useEffect(() => {
    if (isFocused) {
      setLoaded(false);

      const fetchReceipts = async () => {
        const response = await getNewestProductReceipts(product.barcode);

        setReceipts([...response.data.receipts]);
        setLoaded(true);
      };

      fetchReceipts().catch((err) => {
        Alert.alert("Unexpected error");
        console.log(err);
      });
    }
  }, [isFocused, locationGranted]);

  useEffect(() => {
    const requestLocation = async () => {
      {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationGranted(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocationGranted(true);
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    };

    requestLocation().catch((err) => {
      Alert.alert("Location not allowed");
      setLocationGranted(false);
    });
  }, []);

  return (
    <View style={[styles.container, { marginTop: 10 }]}>
      {loaded && locationGranted != undefined ? (
        <>
          {receipts.length === 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text>Oh no! It seems we don't have any shop... 😥</Text>
            </View>
          )}
          <MapView
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 145,
            }}
            initialRegion={initialRegion}
          >
            {locationGranted && (
              <Marker
                coordinate={{
                  latitude: initialRegion.latitude,
                  longitude: initialRegion.longitude,
                }}
                title="You"
              />
            )}

            {receipts.map((receipt) => (
              <Marker
                key={receipt._id}
                coordinate={{
                  latitude: receipt.shop.location.latitude,
                  longitude: receipt.shop.location.longitude,
                }}
                title={`${receipt.price.toString()}€`}
                description={receipt.shop.name}
              >
                {minPriceShop!.shop === receipt.shop ? (
                  <CustomMarker price={receipt.price.toString()} />
                ) : (
                  <CustomMarker
                    price={receipt.price.toString()}
                    variant="secondary"
                  />
                )}
              </Marker>
            ))}
          </MapView>
        </>
      ) : (
        <View style={{ marginTop: 40 }}>
          <ActivityIndicator size="large" color="#f58b54" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDDC7",
  },
});

export default Locations;
