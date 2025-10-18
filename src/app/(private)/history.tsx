import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FooterBtn from "../../components/FooterBtn";
import HistoryItem from "../../components/HistoryItem";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../services/httpClient";
import { useAuth } from "../../hooks/useAuth";

const HistoryPage = () => {
  const { user } = useAuth();

  const { data: history, isFetching } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const { data } = await httpClient.get(`/users/${user?.id}/get-history`);

      return data;
    },
  });

  return (
    <SafeAreaView>
      <View className="h-full items-center justify-between relative">
        <Header arrowLeft />
        <View className="flex-1 border-t border-b border-gray-300 my-4 w-full p-5 gap-5">
          <Text className="text-2xl">Consultas recentes</Text>
          <FlatList
            data={history}
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
