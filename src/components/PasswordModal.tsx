import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordForm, passwordSchema } from "../schemas/passwordUpdate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../services/httpClient";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../hooks/useAuth";

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const PasswordModal = ({ visible, onClose }: PasswordModalProps) => {
  const { userId } = useLocalSearchParams();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPwd: "", newPwd: "", confirmPwd: "" },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["password", "update", userId],
    mutationFn: async (params: PasswordForm) => {
      await httpClient.put(`/users/${userId}/update-password`, {
        current: params.currentPwd,
        new: params.newPwd,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", token] });
    },
  });

  useEffect(() => {
    if (!visible) {
      reset({ currentPwd: "", newPwd: "", confirmPwd: "" });
    }
  }, [visible, reset]);

  const onSubmit = async (data: PasswordForm) => {
    try {
      await mutateAsync(data);
      onClose();
      Alert.alert("Senha alterada!", "Sua senha foi atualizada com sucesso.");
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Não foi possível alterar a senha.");
    }
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center bg-black/50">
        <View className="bg-white dark:bg-zinc-900 p-4 rounded-3xl">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold">Alterar senha</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} />
            </Pressable>
          </View>
          <Text className="text-xs text-zinc-500 mb-1">Senha atual</Text>
          <Controller
            control={control}
            name="currentPwd"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className={`rounded-xl px-3 py-2 border ${
                  errors.currentPwd
                    ? "border-red-500"
                    : "border-black/10 dark:border-white/10"
                } bg-white dark:bg-zinc-800`}
                placeholder="••••••••"
              />
            )}
          />
          {errors.currentPwd && (
            <Text className="text-red-600 text-xs mt-1">
              {errors.currentPwd.message}
            </Text>
          )}
          <Text className="text-xs text-zinc-500 mt-3 mb-1">Nova senha</Text>
          <Controller
            control={control}
            name="newPwd"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className={`rounded-xl px-3 py-2 border ${
                  errors.newPwd
                    ? "border-red-500"
                    : "border-black/10 dark:border-white/10"
                } bg-white dark:bg-zinc-800`}
                placeholder="Mínimo 8 caracteres"
              />
            )}
          />
          {errors.newPwd && (
            <Text className="text-red-600 text-xs mt-1">
              {errors.newPwd.message}
            </Text>
          )}
          <Text className="text-xs text-zinc-500 mt-3 mb-1">
            Confirmar nova senha
          </Text>
          <Controller
            control={control}
            name="confirmPwd"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className={`rounded-xl px-3 py-2 border ${
                  errors.confirmPwd
                    ? "border-red-500"
                    : "border-black/10 dark:border-white/10"
                } bg-white dark:bg-zinc-800`}
                placeholder="Repita a nova senha"
              />
            )}
          />
          {errors.confirmPwd && (
            <Text className="text-red-600 text-xs mt-1">
              {errors.confirmPwd.message}
            </Text>
          )}
          <View className="flex-row justify-center gap-3 mt-4">
            <Pressable
              className="px-4 py-3 rounded-2xl bg-zinc-200 dark:bg-zinc-800"
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text className="text-sm font-medium">Cancelar</Text>
            </Pressable>
            <Pressable
              className={`px-4 py-3 rounded-2xl bg-green-600 ${
                isSubmitting ? "opacity-70" : ""
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-sm font-semibold text-white">
                  Atualizar senha
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;
