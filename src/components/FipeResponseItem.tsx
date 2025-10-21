import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { IVehicleData } from "../types";

interface IFipeResponseItemProps {
  vehicle: IVehicleData;
}

const VehicleHeader = ({ vehicle }: { vehicle: IVehicleData }) => (
  <View className="gap-5 w-[90%] self-center">
    <View className="w-full">
      <Text className="text-2xl font-medium">Veículo</Text>
      <View className="border border-gray-300 rounded-md p-3 mt-3 gap-3 shadow-md">
        <View className="flex-row border-b border-gray-400 justify-between py-2">
          <Text className="text-base font-medium text-slate-500">Marca</Text>
          <Text className="text-base font-semibold">{vehicle.brand}</Text>
        </View>
        <View className="flex-row border-b border-gray-400 justify-between py-2">
          <Text className="text-base font-medium text-slate-500">Modelo</Text>
          <Text className="text-base font-semibold">{vehicle.model}</Text>
        </View>
        <View className="flex-row border-b border-gray-400 justify-between py-2">
          <Text className="text-base font-medium text-slate-500">Ano</Text>
          <Text className="text-base font-semibold">
            {vehicle.year}/{vehicle.model_year}
          </Text>
        </View>
        <View className="flex-row border-b border-gray-400 justify-between py-2">
          <Text className="text-base font-medium text-slate-500">Placa</Text>
          <Text className="text-base font-semibold">{vehicle.plate}</Text>
        </View>
        <View className="flex-row border-b border-gray-400 justify-between py-2">
          <Text className="text-base font-medium text-slate-500">Chassi</Text>
          <Text className="text-base font-semibold">{vehicle.chassis}</Text>
        </View>
        <View className="flex-row border-b border-gray-400 justify-between py-2">
          <Text className="text-base font-medium text-slate-500">
            Localização
          </Text>
          <Text className="text-base font-semibold">
            {vehicle.city}-{vehicle.state}
          </Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="text-base font-medium text-slate-500">Cor</Text>
          <Text className="text-base font-semibold">{vehicle.color}</Text>
        </View>
      </View>
    </View>

    <Text className="text-2xl font-medium">Valor</Text>
  </View>
);

const FipeResponseItem = ({ vehicle }: IFipeResponseItemProps) => {
  return (
    <FlatList
      data={vehicle.fipe}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      ListHeaderComponent={<VehicleHeader vehicle={vehicle} />}
      keyExtractor={(item, index) =>
        `${item.brand}-${item.model}-${item.year_model}-${item.fuel}-${index}`
      }
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      renderItem={({ item }) => (
        <View className="border border-gray-500 rounded-md p-3 mt-3 w-[90%] self-center">
          <Text className="text-lg font-medium text-green-400">
            {item.brand}/{item.model} {item.year_model}
          </Text>
          <Text className="text-lg font-medium text-green-400">
            {item.fuel}
          </Text>
          <Text className="text-lg font-medium text-green-400">
            Ref: {item.reference_month}
          </Text>
          <Text className="text-center text-2xl font-bold text-green-500 mt-2">
            Valor FIPE:{" "}
            {Number(item.value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      )}
      ListFooterComponent={<View style={{ height: 10 }} />}
    />
  );
};

export default FipeResponseItem;
