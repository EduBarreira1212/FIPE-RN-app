import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IHistoryItemProps {
  vehicle: {
    plate: string;
    model: string;
    created_at: string;
  };
}

const HistoryItem = ({ vehicle }: IHistoryItemProps) => {
  return (
    <View className="border rounded-md border-gray-300 p-3 flex-row justify-between items-center">
      <View className="bg-slate-300 p-1.5 rounded-lg">
        <Ionicons name="car-outline" size={40} />
      </View>
      <View className="w-[60%] gap-3">
        <Text className="text-base font-medium">{vehicle.model}</Text>
        <Text className="text-base  font-medium">
          {new Date(vehicle.created_at).toLocaleDateString()}
        </Text>
      </View>
      <View>
        <Text className="text-base font-medium text-green-400">
          {vehicle.plate}
        </Text>
      </View>
    </View>
  );
};

export default HistoryItem;
