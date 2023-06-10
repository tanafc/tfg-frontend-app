import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  View
} from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useProductContext } from "../../context/ProductContext";
import { useProduct } from "../../hooks/useProduct";
import { ScanScreenNavigationProps } from "../../models/Navigation";
import { ProductData } from "../../models/Product";

const ScanScreen = ({ navigation }: ScanScreenNavigationProps) => {
  const [scannedProduct, setScannedProduct] = useState<ProductData | undefined>(
    undefined
  );
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { products, setProducts } = useProductContext();
  const { getProduct } = useProduct();

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () =>
      setIsFocused(true)
    );

    const unsubscribeBlur = navigation.addListener("blur", () => {
      setIsFocused(false);
      setScanned(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    setLoading(true);

    await getProduct(data)
      .then((response) => {
        setScannedProduct(response.data);

        if (!products.some((el) => el.barcode === data)) {
          setProducts([...products, response.data]);
        }
        setBarcode(data);
      })
      .catch((reason) => {
        setBarcode(data);
      });

    setLoading(false);
    setModalVisible(true);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  if (isFocused) {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_a]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        >
          {/** Adds opaque edges */}
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            {scannedProduct !== undefined ? (
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Yay! We have this product 🥳
                </Text>
                <Text>
                  {scannedProduct.name}, {scannedProduct.brand}
                </Text>
                <View style={styles.modalButtons}>
                  <CustomButton
                    text={"Look product info 👀"}
                    onPress={() => {
                      setModalVisible(false);

                      navigation.navigate("Product", {
                        screen: "ProductScreen",
                        params: { barcode: barcode },
                      });
                    }}
                  />
                  <CustomButton
                    text={"Nah, im good"}
                    type="secondary"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  😱 It seems you found a product we dont have! Would you mind
                  sharing information about it?
                </Text>
                <View style={styles.modalButtons}>
                  <CustomButton
                    text={"That would be awesome!"}
                    onPress={() =>
                      navigation.navigate("Product", {
                        screen: "NewProductScreen",
                        params: { barcode: barcode },
                      })
                    }
                  />
                  <CustomButton
                    text={"Nah, im good"}
                    type="secondary"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            )}
          </View>
        </Modal>

        {loading && (
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="#f58b54" />
            </View>
          </View>
        )}

        {scanned && !loading && (
          <View style={styles.buttonView}>
            <CustomButton
              text={"Scan another product"}
              onPress={() => setScanned(false)}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f58b54" />
    </View>
  );
};

const opacity = "rgba(0,0,0,.6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDDC7",
  },

  scanArea: {
    flex: 1,
    flexDirection: "column",
  },

  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },

  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },

  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },

  focused: {
    flex: 10,
  },

  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },

  buttonView: {
    width: "60%",
  },

  text: {
    fontSize: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
  },

  modalButtons: {
    marginTop: 15,
    width: "80%",
  },
});

export default ScanScreen;
