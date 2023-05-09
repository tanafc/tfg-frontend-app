import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../models/Navigation";
import NewProductScreen from "../screens/Products/NewProductScreen";

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
    </ProductStack.Navigator>
  );
};
