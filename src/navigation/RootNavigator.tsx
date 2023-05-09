import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/Navigation";
import { AuthNavigator } from "./AuthNavigator";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { ProductNavigator } from "./ProductNavigator";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Product"
        component={ProductNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
