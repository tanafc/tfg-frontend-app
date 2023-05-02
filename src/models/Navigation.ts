import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ScanScreen: undefined;
  ProfileScreen: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, "HomeScreen">,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProfileScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, "ProfileScreen">,
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
