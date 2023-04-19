import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { HomeScreenRouteProps } from "../../models/Navigation";

const HomeScreen = ({ navigation }: HomeScreenRouteProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Hello</Text>
        </View>

        <View style={styles.buttonView}>
          <CustomButton
            text="Login"
            onPress={() => navigation.navigate("LoginScreen")}
          />

          <CustomButton
            text="Signup"
            onPress={() => navigation.navigate("SignupScreen")}
          />
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
