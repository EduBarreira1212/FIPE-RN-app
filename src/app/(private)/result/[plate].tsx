import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import FipeResponseItem from "../../../components/FipeResponseItem";
import FooterBtn from "../../../components/FooterBtn";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../services/httpClient";
import { IVehicleData } from "../../../types";

const ResultPage = () => {
  const { plate } = useLocalSearchParams<{ plate: string }>();
  const router = useRouter();

  const {
    data: vehicleData,
    isPending,
    error,
  } = useQuery<IVehicleData, Error>({
    queryKey: ["fipe", plate],
    queryFn: async () => {
      const { data } = await httpClient.post<IVehicleData>("/fipe", { plate });

      return data;
    },
    enabled: !!plate,
  });

  if (isPending) {
    return (
      <SafeAreaView className="flex-1">
        <View className="items-center justify-center h-full w-full">
          <ActivityIndicator size="large" color="#4ade80" />
          <Text className="text-black text-lg font-semibold mt-4">
            Buscando informações do veículo...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View className="h-full items-center justify-between relative">
          <Text>Erro ao buscar dados do veículo.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="h-full items-center justify-between relative">
        <Header arrowLeft />
        <View className="flex-1 border-t border-b border-gray-300 my-4 py-3 w-full items-center gap-5">
          <FipeResponseItem vehicle={vehicleData!} />
        </View>
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
