import { router, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FooterBtn from "../../components/FooterBtn";
import { IVehicleData } from "../../types";
import FipeResponseItem from "../../components/FipeResponseItem";

const ResultPage = () => {
  const router = useRouter();

  const vehicleData: IVehicleData = {
    brand: "VOLKSWAGEN",
    model: "FOX CONNECT MB",
    year: "2019",
    model_year: "2020",
    color: "Branca",
    chassis: "******6860",
    city: "Fortaleza",
    state: "CE",
    plate: "POF0743",
    fipe: [
      {
        brand: "VW - VOLKSWAGEN",
        model: "FOX 1.6 FLEX 8V 5P",
        year_model: "2020",
        reference_month: "Outubro de 2025",
        fuel: "FLEX",
        value: "60000.00",
      },
      {
        brand: "VW - VOLKSWAGEN",
        model: "FOX CONNECT 1.6 FLEX 8V 2P",
        year_model: "2020",
        reference_month: "Outubro de 2025",
        fuel: "FLEX",
        value: "60490.00",
      },
      {
        brand: "VW - VOLKSWAGEN",
        model: "FOX CONNECT 1.6 FLEX 8V 5P",
        year_model: "2020",
        reference_month: "Outubro de 2025",
        fuel: "FLEX",
        value: "65000.00",
      },
    ],
  };

  return (
    <SafeAreaView>
      <View className="h-full items-center justify-between relative">
        <View className="flex-row w-full px-3 items-center justify-center relative">
          <Pressable className="absolute left-3" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} />
          </Pressable>
          <Text className="text-2xl text-center">Consulta FIPE</Text>
        </View>
        <View className="flex-1 border-t border-b border-gray-300 my-4 py-3 w-full items-center gap-5">
          <FipeResponseItem vehicle={vehicleData} />
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
