import { getAccountHttp } from "../api/account/getAccountHttp";
import { useAuth } from "../context/AuthContext";

export const useAccount = () => {
  const { account } = useAuth();

  return getAccountHttp({
    username: account.username,
    accessToken: account.accessToken,
  });
};
