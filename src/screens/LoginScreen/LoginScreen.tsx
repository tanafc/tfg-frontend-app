import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton, {
  CustomButtonTypes,
} from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { LoginScreenRouteProps } from "../../models/Navigation";

const LoginScreen = ({ navigation }: LoginScreenRouteProps) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = () => {
    Alert.alert("Username: " + username + " Password: " + password);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Login</Text>
        </View>

        <View style={styles.inputView}>
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />

          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />

          <CustomButton text="Login" onPress={handleLogin} />

          <CustomButton
            text="Or click here to Signup"
            onPress={() => navigation.navigate("SignupScreen")}
            type={CustomButtonTypes.TERTIARY}
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

  inputView: {
    width: "70%",
    alignItems: "center",
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

export default LoginScreen;
