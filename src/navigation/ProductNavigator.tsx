import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../models/Navigation";
import NewProductScreen from "../screens/Products/NewProductScreen";
import ProductScreen from "../screens/Products/ProductScreen";
import NewPriceScreen from "../screens/Products/NewPriceScreen";

export const ProductStack = createNativeStackNavigator<ProductStackParamList>();

export const ProductNavigator = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="NewProductScreen"
        component={NewProductScreen}
        initialParams={{ barcode: "" }}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="NewPriceScreen"
        component={NewPriceScreen}
        initialParams={{ barcode: "", name: "", brand: "" }}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        initialParams={{ barcode: "" }}
        options={{ title: "Product" }}
      />
    </ProductStack.Navigator>
  );
};
