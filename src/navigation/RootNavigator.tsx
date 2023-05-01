
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/Navigation";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
  );
}
