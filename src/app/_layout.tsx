import { Stack } from "expo-router";
import "../styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const isLoggedIn = false;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(private)" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}
