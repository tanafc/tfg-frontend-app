import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../../../components/CustomButton";
import { useReceipt } from "../../../../../hooks/useReceipt";
import { ProductData } from "../../../../../models/Product";
import { ReceiptData } from "../../../../../models/Receipt";
import { formatDate } from "../../../../../utils/formatDate";

type PricesProps = {
  product: ProductData;
  navigation: any;
};

export const Prices = ({ product, navigation }: PricesProps) => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [receiptsLoaded, setReceiptsLoaded] = useState(false);

  const { getNewestProductReceipts } = useReceipt();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setReceiptsLoaded(false);

      const fetchReceipts = async () => {
        const response = await getNewestProductReceipts(product.barcode);

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
    <View style={styles.container}>
      <Text style={styles.titleText}>Prices:</Text>

      {receiptsLoaded ? (
        <>
          {receipts.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={styles.bodyText}>No data found 😥</Text>
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
                  barcode: product.barcode,
                  name: product.name,
                  brand: product.brand,
                })
              }
            />
          </View>
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
    width: 100,
  },

  bodyText: {
    fontSize: 18,
  },

  buttonView: {
    marginTop: 15,
    marginBottom: 50,
  },
});
