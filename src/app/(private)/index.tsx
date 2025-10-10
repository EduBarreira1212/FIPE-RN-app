import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <View className="bg-black h-full items-center justify-center">
        <Text className="text-red-500">Você está logado</Text>
      </View>
    </SafeAreaView>
  );
}
