import { loginHttp } from "../api/auth/login/loginHttp";

export const useLogin = () => {
  return loginHttp;
};
