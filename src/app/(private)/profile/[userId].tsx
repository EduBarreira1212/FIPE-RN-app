import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../hooks/useAuth";

const ProfilePage = () => {
  const { userId } = useLocalSearchParams();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-zinc-950">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        className="flex-1 px-4"
      >
        <View className="flex-row items-center justify-between mt-2 mb-4">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} />
          </Pressable>
          <Text className="text-2xl font-semibold">Seu perfil</Text>
          <Pressable
            className="px-2 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700"
            onPress={() => signOut()}
          >
            <Ionicons name="log-out-outline" size={18} />
          </Pressable>
        </View>
        <View className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 mb-6">
          <Text className="text-base font-semibold mb-3">Informações</Text>
        </View>
        <View className="flex-row justify-end gap-3">
          <Pressable className="px-4 py-3 rounded-2xl bg-red-600 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700">
            <Text className={`text-sm font-medium text-white`}>Cancelar</Text>
          </Pressable>

          <Pressable className={`px-4 py-3 rounded-2xl bg-green-600`}>
            <Text
              className={`text-sm  font-semibold text-white dark:text-black"
                }`}
            >
              Salvar alterações
            </Text>
          </Pressable>
        </View>

        {/* Segurança (opcional) */}
        <View className="mt-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 p-4">
          <Text className="text-base font-semibold mb-3">Segurança</Text>
          <Text className="text-xs text-zinc-500 mb-3">
            Para alterar senha ou método de login, vá em Configurações da conta.
          </Text>
          <Pressable
            className="self-start px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700"
            onPress={() => {
              // ex.: router.push("/settings/security") ou abrir modal
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={18} />
              <Text className="ml-2 text-sm font-medium">
                Gerenciar segurança
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
