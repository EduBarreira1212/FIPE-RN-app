import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FooterBtn from "../../components/FooterBtn";
import HistoryItem from "../../components/HistoryItem";

const historyList = [
  {
    plate: "ABC1234",
    model: "VW T-Cross comfortline",
    fipe: 100000,
  },
  {
    plate: "AAA1A11",
    model: "Ferrari 488",
    fipe: 2250000,
  },
  {
    plate: "ZZZ0000",
    model: "Bugatti Veyron",
    fipe: 20850000,
  },
];

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
          <FlatList
            data={historyList}
            keyExtractor={(item) => item.plate}
            renderItem={({ item }) => <HistoryItem vehicle={item} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListFooterComponent={<View style={{ height: 50 }} />}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Nenhuma consulta realizada
              </Text>
            }
            initialNumToRender={10}
            windowSize={5}
            onEndReachedThreshold={0.5}
          />
        </View>
        <View className="w-full items-center justify-around flex-row">
          <FooterBtn
            active={false}
            icon={"search-outline"}
            text="Consultar"
            onPress={() => router.push("/")}
          />
          <FooterBtn active icon={"refresh-outline"} text="Histórico" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
