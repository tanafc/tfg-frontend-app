import { StackActions } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { HomeScreenRouteProps } from "../../models/Navigation";

const HomeScreen = ({ navigation }: HomeScreenRouteProps) => {
  const { account } = useAuth();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Welcome back, {account.username}</Text>
        </View>

        <View style={styles.buttonView}>
          <CustomButton
            text="Have a nice day"
            onPress={() => Alert.alert("I love you <3")}
          />
        </View>

        <View style={styles.buttonView}>
          <CustomButton text="Logout" onPress={handleLogout} />
        </View>
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

  buttonView: {
    width: "80%",
  },

  titleView: {
    marginBottom: 15,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },
});

export default HomeScreen;
