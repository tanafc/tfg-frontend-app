import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer
} from "victory-native";
import CustomButton from "../../../../../components/CustomButton";
import { useReceipt } from "../../../../../hooks/useReceipt";
import { ProductData } from "../../../../../models/Product";
import { ReceiptData } from "../../../../../models/Receipt";
import {
  addDaysTo,
  formatDate,
  substractDaysTo,
} from "../../../../../utils/formatDate";

type PricesProps = {
  product: ProductData;
  navigation: any;
};

export const Prices = ({ product, navigation }: PricesProps) => {
  const [newestReceipts, setNewestReceipts] = useState<ReceiptData[]>([]);
  const [newestLoaded, setNewestLoaded] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { getProductReceipts, getNewestProductReceipts } = useReceipt();

  const shops = newestReceipts.map((receipt) => receipt.shop.name);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setNewestLoaded(false);

      const fetchReceipts = async () => {
        const response = await getNewestProductReceipts(product.barcode);

        setNewestReceipts([...response.data.receipts]);
        setNewestLoaded(true);
      };

      fetchReceipts().catch((err) => {
        Alert.alert("Unexpected error");
        console.log(err);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && newestLoaded) {
      const shopPromises = shops.map(async (shop) =>
        shopReceiptData(shop)
          .then((data) => data.reverse())
          .catch((err) => {
            Alert.alert("Unexpected error");
            console.log(err);
          })
      );

      Promise.all(shopPromises).then((shopReceipts) => {
        setData(shopReceipts);
        setDataLoaded(true);
      });
    }
  }, [newestLoaded]);

  const shopReceiptData = async (shop: string) => {
    try {
      const response = await getProductReceipts(product.barcode, shop);

      const data = response.data.receipts.map((receipt: ReceiptData) => {
        return {
          shop: shop,
          product: receipt.product.name,
          price: receipt.price,
          date: new Date(receipt.date),
        };
      });

      return data;
    } catch (err) {
      Alert.alert("Unexpected error");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Prices:</Text>

      {newestLoaded ? (
        <>
          {newestReceipts.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={styles.bodyText}>No data found 😥</Text>
            </View>
          ) : (
            <View style={[styles.infoView, { alignItems: "flex-start" }]}>
              {newestReceipts.map((receipt) => (
                <View key={receipt._id} style={styles.infoRow}>
                  <Text style={[styles.labelText, { width: 120 }]}>
                    {receipt.shop.name}:
                  </Text>
                  <Text style={[styles.bodyText, { width: 80 }]}>
                    {receipt.price} €
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
                  barcode: product.barcode,
                  name: product.name,
                  brand: product.brand,
                })
              }
            />
          </View>

          {dataLoaded ? (
            data.map((shopData, index) => (
              <View key={index} style={{ marginTop: 25 }}>
                <Text style={[styles.labelText, { width: "100%" }]}>
                  {shopData[0].shop}
                </Text>
                <VictoryChart
                  width={350}
                  theme={VictoryTheme.material}
                  scale={{ x: "time", y: "linear" }}
                  domain={{
                    x: [
                      substractDaysTo(new Date(shopData[0].date), 1),
                      addDaysTo(new Date(shopData.at(-1).date), 1),
                    ],
                    y: [
                      0,
                      Math.max(...shopData.map((el: any) => el.price)) + 5,
                    ],
                  }}
                  containerComponent={
                    <VictoryZoomContainer zoomDimension="x" />
                  }
                >
                  <VictoryAxis />
                  <VictoryAxis dependentAxis tickFormat={(y) => `${y}€`} />
                  <VictoryLine data={shopData} x="date" y="price" />
                  <VictoryScatter
                    size={5}
                    data={shopData}
                    x="date"
                    y="price"
                    style={{ data: { fill: "green" } }}
                  />
                </VictoryChart>
              </View>
            ))
          ) : (
            <View style={{ marginTop: 40 }}>
              <ActivityIndicator size="large" color="#f58b54" />
            </View>
          )}
        </>
      ) : (
        <View style={{ marginTop: 40 }}>
          <ActivityIndicator size="large" color="#f58b54" />
        </View>
      )}
    </View>
  );
};

export default Prices;

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
  },

  bodyText: {
    fontSize: 18,
  },

  buttonView: {
    marginTop: 15,
    marginBottom: 20,
  },
});
