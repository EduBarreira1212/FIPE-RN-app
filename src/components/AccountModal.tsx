// AccountModal.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Platform,
  BackHandler,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { router } from "expo-router";

export const AccountModal = () => {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const { user, signOut } = useAuth();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      close();
      return true;
    });
    return () => sub.remove();
  }, [open, close]);

  const headerHeight = (Platform.OS === "android" ? 56 : 44) + insets.top;

  return (
    <View className="relative mt-1">
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel="Abrir menu da conta"
        className="h-9 w-9 rounded-full bg-black/5 dark:bg-white/10 items-center justify-center"
      >
        <Text className="font-semibold text-xs">EB</Text>
      </Pressable>
      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={close}
      >
        <Pressable onPress={close} className="absolute inset-0 bg-black/20" />
        <View
          pointerEvents="box-none"
          className="absolute right-3"
          style={{ top: headerHeight + 6 }}
        >
          <View className="w-56 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg border border-black/5 dark:border-white/10">
            <View className="px-4 py-3 border-b border-black/5 dark:border-white/10">
              <Text className="text-base font-semibold">Sua conta</Text>
              <Text className="text-xs text-zinc-500">
                gerenciar perfil e sessão
              </Text>
            </View>
            <View className="py-1">
              <MenuItem
                icon="person-circle-outline"
                label="Minha conta"
                onPress={() => {
                  close();
                  router.push(`/profile/${user?.id}`);
                }}
              />
              <View className="my-1 h-px bg-black/5 dark:bg-white/10" />
              <MenuItem
                icon="log-out-outline"
                label="Sair"
                destructive
                onPress={async () => {
                  close();
                  try {
                    await signOut();
                  } catch (e) {
                    console.warn("Erro ao sair:", e);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MenuItem = ({
  icon,
  label,
  destructive,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  destructive?: boolean;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="px-4 py-3 flex-row items-center active:bg-black/5 dark:active:bg-white/10"
      android_ripple={{ borderless: false }}
    >
      <Ionicons name={icon} size={18} />
      <Text
        className={`ml-3 text-sm ${destructive ? "text-red-600 dark:text-red-400 font-semibold" : ""}`}
      >
        {label}
      </Text>
    </Pressable>
  );
};
