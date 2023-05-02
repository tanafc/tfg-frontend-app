import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import CustomButton from "../../components/CustomButton";
import { ProfileScreenNavigationProps } from "../../models/Navigation";
import { StackActions } from "@react-navigation/native";

const ProfileScreen = ({ navigation }: ProfileScreenNavigationProps) => {
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
          <Text style={styles.titleText}>Profile Page</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.bodyText}>Username: {account.username}</Text>
          <Text style={styles.bodyText}>Email: {account.email}</Text>
          <Text style={styles.bodyText}>Role: {account.role}</Text>
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

  titleView: {
    marginBottom: 5,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },

  infoView: {
    padding: 20
  },

  bodyText: {
    fontSize: 20,
  },

  buttonView: {
    width: "60%",
  },
});

export default ProfileScreen;
