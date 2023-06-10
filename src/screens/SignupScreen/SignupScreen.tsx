import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useSignup } from "../../hooks/useSignup";
import { SignupScreenNavigationProps } from "../../models/Navigation";

const SignupScreen = ({ navigation }: SignupScreenNavigationProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const signup = useSignup();

  const handleSignup = () => {
    setLoading(true);

    signup({ username, email, password })
      .then(() => {
        setLoading(false);
        navigation.navigate("LoginScreen");
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Input not valid");
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Signup</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.labelInput}>Username</Text>
          <CustomInput
            placeholder="John Doe"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.labelInput}>Email</Text>
          <CustomInput
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.labelInput}>Password</Text>
          <CustomInput
            placeholder="*********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.labelInput}>Confirm Password</Text>
          <CustomInput
            placeholder="*********"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry
          />

          <CustomButton
            text="Signup"
            onPress={handleSignup}
            loading={loading}
          />

          <CustomButton
            text="Go to Login"
            onPress={() => navigation.navigate("LoginScreen")}
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
  },

  labelInput: {
    marginTop: 5,
  },

  titleView: {
    marginBottom: 10,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },
});

export default SignupScreen;
