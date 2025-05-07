import axios from "axios";
import qs from "qs";

const API_CHATBOT_URL = process.env.REACT_APP_CHAT_BOT_URL;

const apiClient = axios.create({
  baseURL: API_CHATBOT_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
