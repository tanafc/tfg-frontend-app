import axios from "axios";

const httpClient = () => {
  const httpClient = axios.create({
    baseURL: ""
  });

  return httpClient;
};

export default httpClient;
