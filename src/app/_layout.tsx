import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import "../styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootLayout() {
  const { isLoggedIn, isLoading } = useAuth();
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync();
      try {
        await Asset.loadAsync([
          require("../assets/onboarding-bg/app-bg.png"),
          require("../assets/logo.png"),
        ]);
      } finally {
        setAssetsReady(true);
      }
    })();
  }, []);

  const appReady = assetsReady && !isLoading;

  const onLayout = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      {appReady ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(private)" />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(public)" />
          </Stack.Protected>
        </Stack>
      ) : null}
    </View>
  );
}
