import { Link, useRouter } from "expo-router";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="h-full items-center justify-between">
        <Text className="text-2xl">Consulta FIPE</Text>
        <View className="flex-1 border-t border-b border-gray-300 my-4 w-full items-center justify-center gap-5">
          <View className="w-full items-center">
            <Image
              source={require("../../assets/logo.png")}
              className="w-[150px] h-[150px] "
            />
            <Text className="text-3xl">Consulte a tabela FIPE</Text>
            <Text className="text-base font-light">
              Insira a placa do veículo para começar
            </Text>
          </View>
          <View className="w-[90%] gap-3">
            <TextInput
              className="border border-gray-500 w-full rounded-md p-4 text-center text-xl"
              placeholder="AAA-1111 ou AAA1A11"
            />
            <Pressable
              className="bg-green-400 w-full flex-row items-center justify-center gap-3 rounded-lg p-3 my-2 active:bg-green-500"
              onPress={() => router.push("/result")}
            >
              <Ionicons name="search-outline" size={35} color="black" />
              <Text className="text-lg font-semibold">Consultar</Text>
            </Pressable>
          </View>
        </View>
        <View className="w-full items-center justify-around flex-row">
          <Pressable className="items-center gap-1" disabled>
            <Ionicons name="search-outline" size={35} color="#4ade80" />
            <Text className="text-green-400 font-semibold">Consultar</Text>
          </Pressable>
          <Pressable
            className="items-center gap-1"
            onPress={() => router.push("/history")}
          >
            <Ionicons name="refresh-outline" size={35} />
            <Text className="font-semibold">Histórico</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
