import { useAuth } from "../context/AuthContext";
import { Role } from "../models/Auth";

export const useLogout = () => {
  const { saveAccount } = useAuth();

  return () =>
    saveAccount({
      username: "",
      email: "",
      role: Role.REGULAR,
      accessToken: "",
    });
};
