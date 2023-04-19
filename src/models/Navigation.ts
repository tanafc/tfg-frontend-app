
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type HomeScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "HomeScreen"
>;

export type LoginScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "LoginScreen"
>;

export type SignupScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "SignupScreen"
>;
