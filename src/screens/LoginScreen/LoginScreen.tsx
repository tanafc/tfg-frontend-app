import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useAuth } from "../../context/AuthContext";
import { useLogin } from "../../hooks/useLogin";
import { LoginScreenNavigationProps } from "../../models/Navigation";
import { useAccount } from "../../hooks/useAccount";
import { useLogout } from "../../hooks/useLogout";
import { useIsFocused } from "@react-navigation/native";

const LoginScreen = ({ navigation }: LoginScreenNavigationProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { saveAccount } = useAuth();
  const getAccount = useAccount();
  const login = useLogin();
  const logout = useLogout();

  const isFocused = useIsFocused();

  const handleAccount = async () => {
    setLoading(true);

    getAccount()
      .then(() => {
        navigation.navigate("Home", { screen: "HomeScreen" });
      })
      .catch(() => {
        setLoading(false);
        logout();
      });
  };

  const handleLogin = () => {
    setLoading(true);

    login({ username, password })
      .then(async (res) => {
        await saveAccount({
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
          accessToken: res.data.accessToken,
        });
        setLoading(false);
        navigation.navigate("Home", { screen: "HomeScreen" });
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("User not found");
      });
  };

  useEffect(() => {
    handleAccount();
  }, []);

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isFocused]);

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
            onChangeText={setUsername}
          />

          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <CustomButton text="Login" onPress={handleLogin} loading={loading} />

          <CustomButton
            text="Or click here to Signup"
            onPress={() => navigation.navigate("SignupScreen")}
            type="secondary"
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
