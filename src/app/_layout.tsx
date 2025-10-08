import { Stack } from "expo-router";
import "../styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(private)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}
