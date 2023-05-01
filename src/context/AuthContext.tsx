import React, { ReactNode, useContext, useEffect } from "react";
import { Authentication, Role } from "../models/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  account: Authentication;
  saveAccount: (account: Authentication) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [account, setAccount] = React.useState({
    username: "",
    email: "",
    role: Role.REGULAR,
    accessToken: ""
  })

  const getAccount = async () => {
    const username = await AsyncStorage.getItem("username");
    const email = await AsyncStorage.getItem("email");
    const role = await AsyncStorage.getItem("role");
    const accessToken = await AsyncStorage.getItem("accessToken");

    return {
      username: username ?? "",
      email: email ?? "",
      role: (role as Role) ?? Role.REGULAR,
      accessToken: accessToken ?? "",
    };
  };

  const saveAccount = async (account: Authentication) => {
    try {
      await AsyncStorage.setItem("username", account.username);
      await AsyncStorage.setItem("email", account.email);
      await AsyncStorage.setItem("role", account.role);
      await AsyncStorage.setItem("accessToken", account.accessToken);

      setAccount(account);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAccount().then((account) => setAccount(account))
  }, [])

  const value = {
    account,
    saveAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};
