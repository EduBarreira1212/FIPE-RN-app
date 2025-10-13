import { router, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FooterBtn from "../../components/FooterBtn";

const ResultPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="h-full items-center justify-between relative">
        <View className="flex-row w-full px-3 items-center justify-center relative">
          <Pressable className="absolute left-3" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} />
          </Pressable>
          <Text className="text-2xl text-center">Consulta FIPE</Text>
        </View>
        <View className="flex-1 border-t border-b border-gray-300 my-4 w-full items-center justify-center gap-5"></View>
        <View className="w-full items-center justify-around flex-row">
          <FooterBtn
            active={false}
            icon={"search-outline"}
            text="Consultar"
            onPress={() => router.push("/")}
          />
          <FooterBtn
            active={false}
            icon={"refresh-outline"}
            text="Histórico"
            onPress={() => router.push("/history")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultPage;
