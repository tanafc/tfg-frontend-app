import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Product: NavigatorScreenParams<ProductStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ScanScreen: undefined;
  ProfileScreen: undefined;
};

export type ProductStackParamList = {
  NewProductScreen: { barcode: string };
  NewPriceScreen: { barcode: string; name: string; brand: string };
  ProductScreen: { barcode: string };
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, "HomeScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type ScanScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, "ScanScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type SearchScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, "SearchScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProfileScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, "ProfileScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type NewProductScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, "NewProductScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type NewPriceScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, "NewPriceScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProductScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, "ProductScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, "LoginScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type SignupScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, "SignupScreen">,
  NativeStackScreenProps<RootStackParamList>
>;
