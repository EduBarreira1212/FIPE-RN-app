import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import "./styles/global.css";

export default function App() {
  return (
    <View className="bg-red-500 flex-1 items-center justify-center">
      <Text className="text-5xl ">FIPE APP</Text>
      <StatusBar style="auto" />
    </View>
  );
}
