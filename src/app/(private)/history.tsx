import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HistoryPage = () => {
  return (
    <SafeAreaView>
      <View className="h-full items-center justify-between relative">
        <View className="flex-row w-full px-3 items-center justify-center relative">
          <Pressable className="absolute left-3" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} />
          </Pressable>
          <Text className="text-2xl text-center">Consulta FIPE</Text>
        </View>
        <View className="flex-1 border-t border-b border-gray-300 my-4 w-full p-5 gap-5">
          <Text className="text-2xl">Consultas recentes</Text>
        </View>
        <View className="w-full items-center justify-around flex-row">
          <Pressable
            className="items-center gap-1"
            onPress={() => router.push("/")}
          >
            <Ionicons name="search-outline" size={35} />
            <Text className="font-semibold">Consultar</Text>
          </Pressable>
          <Pressable
            className="items-center gap-1"
            onPress={() => router.push("/history")}
            disabled
          >
            <Ionicons name="refresh-outline" size={35} color="#4ade80" />
            <Text className="text-green-400 font-semibold">Histórico</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
