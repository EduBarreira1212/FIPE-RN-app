import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { httpClient } from "../services/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TOKEN_STORAGE_KEY from "../auth/tokenStorage";

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  history: string[];
};

interface IAuthContextValue {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn(params: SignInParams): Promise<void>;
  signUp(params: SignUpParams): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      setToken(data);
      setIsLoadingToken(false);
    };

    load();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        delete httpClient.defaults.headers.common.Authorization;
        return;
      }

      httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    };

    run();
  }, [token]);

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post("/login", params);
      setToken(data);
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      const { data } = await httpClient.post("/users", params);
      setToken(data);
    },
  });

  const { data: user, isFetching } = useQuery({
    enabled: !!token,
    queryKey: ["user", token],
    queryFn: async () => {
      const { data } = await httpClient.get("/me");

      return data;
    },
  });

  const signOut = useCallback(async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isLoading: isLoadingToken || isFetching,
        signIn,
        signUp,
        signOut,
        user: user ?? null,
        token: token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
