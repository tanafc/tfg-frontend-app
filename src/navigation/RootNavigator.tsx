import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/Navigation";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { AuthNavigator } from "./AuthNavigator";

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
    </RootStack.Navigator>
  );
};
