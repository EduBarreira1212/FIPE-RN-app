import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import TOKEN_STORAGE_KEY from '../auth/tokenStorage';

export const httpClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
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