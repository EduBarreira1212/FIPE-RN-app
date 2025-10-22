import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export const ProfileHeader: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View className="flex-row items-center justify-between mt-2 mb-4">
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} />
      </Pressable>
      <Text className="text-2xl font-semibold">Seu perfil</Text>
      <Pressable
        className="px-2 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700"
        onPress={signOut}
      >
        <Ionicons name="log-out-outline" size={18} />
      </Pressable>
    </View>
  );
};
