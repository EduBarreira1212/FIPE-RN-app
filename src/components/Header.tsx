import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { router } from "expo-router";

interface IHeaderProps {
  arrowLeft: boolean;
}

const Header = ({ arrowLeft }: IHeaderProps) => {
  const { signOut } = useAuth();

  if (arrowLeft) {
    return (
      <View className="flex-row w-full px-3 items-center justify-center relative">
        <Pressable className="absolute left-3" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} />
        </Pressable>
        <Text className="text-2xl text-center">Consulta FIPE</Text>
        <Pressable className="absolute right-3" onPress={() => signOut()}>
          <Ionicons name="exit-outline" size={30} />
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-row w-full px-3 items-center justify-center relative">
      <Text className="text-2xl text-center">Consulta FIPE</Text>
      <Pressable className="absolute right-3" onPress={() => signOut()}>
        <Ionicons name="exit-outline" size={30} />
      </Pressable>
    </View>
  );
};

export default Header;
