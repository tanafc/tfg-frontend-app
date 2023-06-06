import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";
import { HomeScreenNavigationProps } from "../../models/Navigation";

const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const { account } = useAuth();

  const { products } = useProductContext();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Welcome {account.username}</Text>
        </View>

        {products.length > 0 && (
          <View style={styles.productContainer}>
            <Text style={styles.subtitleText}>Last products seen 👀</Text>
            <View style={styles.productList}>
              {[...products].reverse().map((product) => (
                <Pressable
                  key={product.barcode}
                  onPress={() =>
                    navigation.navigate("Product", {
                      screen: "ProductScreen",
                      params: { barcode: product.barcode },
                    })
                  }
                  style={styles.productRow}
                >
                  <Ionicons name="arrow-redo" size={25} color="tomato" />
                  <Text style={styles.productText}>{product.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
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

  subtitleText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  productContainer: {
    width: "80%",
  },

  productList: {},

  productRow: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  productText: {
    fontSize: 16,
  },
});

export default HomeScreen;
