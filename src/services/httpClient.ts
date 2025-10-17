import axios from 'axios';
import { TOKEN_STORAGE_KEY } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export const httpClient = axios.create({
    baseURL: 'https://adversarially-nondisciplinable-rayne.ngrok-free.dev/api'
});

httpClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err.response?.status;
    const url = err.config?.url;
    if (status === 401 && url !== "/sign-in") {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      router.push('/sign-in');
    }
    return Promise.reject(err);
  }
);