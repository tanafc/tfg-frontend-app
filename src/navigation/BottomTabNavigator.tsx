import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackParamList } from "../models/Navigation";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import ScanScreen from "../screens/ScanScreen";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator<HomeStackParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "add";

          if (route.name === "HomeScreen") {
            iconName = focused
              ? "home"
              : "home-outline";
          } else if (route.name === "SearchScreen") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "ScanScreen") {
            iconName = focused ? "scan-circle" : "scan-circle-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, title: "Home" }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false, title: "Search" }}
      />
      <Tab.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ headerShown: false, title: "Scan" }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tab.Navigator>
  );
};
