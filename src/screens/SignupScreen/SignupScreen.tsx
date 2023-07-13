import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useSignup } from "../../hooks/useSignup";
import { SignupScreenNavigationProps } from "../../models/Navigation";
import {
  isSecure,
  isValidEmail,
  isValidUsername,
} from "../../utils/validateAccount";

const SignupScreen = ({ navigation }: SignupScreenNavigationProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const signup = useSignup();

  const handleSignup = () => {
    setLoading(true);

    signup({ username, email, password })
      .then(() => {
        setLoading(false);
        navigation.navigate("LoginScreen");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 409) {
          Alert.alert("The username is already taken");
        } else {
          Alert.alert("Input not valid");
        }
      });
  };

  const validEmail = isValidEmail(email);
  const validUsername = isValidUsername(username);
  const validPassword = isSecure(password);
  const equalPasswords = password === confirmPassword;

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

          {username !== "" && !validUsername && (
            <Text style={styles.errorText}>
              Between 4 to 20 without special characters.
            </Text>
          )}

          <Text style={styles.labelInput}>Email</Text>
          <CustomInput
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
          />

          {email !== "" && !validEmail && (
            <Text style={styles.errorText}>Must be a valid email.</Text>
          )}

          <Text style={styles.labelInput}>Password</Text>
          <CustomInput
            placeholder="*********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {password !== "" && !validPassword && (
            <Text style={styles.errorText}>
              At least 8 characters, with one uppercase and one lowercase.
            </Text>
          )}

          <Text style={styles.labelInput}>Confirm Password</Text>
          <CustomInput
            placeholder="*********"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {confirmPassword !== "" && !equalPasswords && (
            <Text style={styles.errorText}>Passwords do not match.</Text>
          )}

          <View style={{ marginTop: 15 }}>
            <CustomButton
              text="Signup"
              onPress={handleSignup}
              loading={loading}
              disabled={
                !(
                  validUsername &&
                  validEmail &&
                  validPassword &&
                  equalPasswords
                )
              }
            />

            <CustomButton
              text="Go to Login"
              onPress={() => navigation.navigate("LoginScreen")}
              type="secondary"
            />
          </View>
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
    marginTop: 10,
  },

  titleView: {
    marginBottom: 10,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },

  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default SignupScreen;
