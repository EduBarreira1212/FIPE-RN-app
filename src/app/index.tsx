import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <View className="bg-black h-full items-center justify-center">
        <Text className="text-red-500">FIPE APP</Text>
        <Link href={"/sign-in"} className="text-white">
          Login
        </Link>
      </View>
    </SafeAreaView>
  );
}
