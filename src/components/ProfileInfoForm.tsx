import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ProfileForm, profileSchema } from "../schemas/profile";
import { httpClient } from "../services/httpClient";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../hooks/useAuth";

const ProfileInfoForm = () => {
  const { userId } = useLocalSearchParams();
  const { user, token } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, reset]);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["user", "update", userId],
    mutationFn: async (params: ProfileForm) => {
      await httpClient.put(`/users/${userId}`, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", token] });
    },
  });

  const onSubmitProfile = async (data: ProfileForm) => {
    const changedName = data.name.trim() !== (user?.name ?? "");
    const changedEmail = data.email.trim() !== (user?.email ?? "");

    try {
      if (changedName || changedEmail) {
        await mutateAsync(data);
        Alert.alert("Pronto!", "Suas alterações foram salvas.");
      }
      reset(data);
    } catch (e: any) {
      Alert.alert(
        "Erro",
        e?.message ?? "Não foi possível salvar as alterações."
      );
    }
  };

  const onCancelProfile = () => {
    reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
    });
  };

  return (
    <View className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 mb-6">
      <Text className="text-base font-semibold mb-3">Informações</Text>
      <Text className="text-xs text-zinc-500 mb-1">Nome</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Seu nome"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className={`rounded-xl px-3 py-2 border ${
              errors.name
                ? "border-red-500"
                : "border-black/10 dark:border-white/10"
            } bg-white dark:bg-zinc-800`}
            autoCapitalize="words"
            returnKeyType="next"
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-600 text-xs mt-1">{errors.name.message}</Text>
      )}
      <Text className="text-xs text-zinc-500 mt-4 mb-1">Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className={`rounded-xl px-3 py-2 border ${
              errors.email
                ? "border-red-500"
                : "border-black/10 dark:border-white/10"
            } bg-white dark:bg-zinc-800`}
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-600 text-xs mt-1">
          {errors.email.message}
        </Text>
      )}
      <View className="flex-row justify-end gap-3 mt-4">
        <Pressable
          className="px-4 py-3 rounded-2xl bg-red-600 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700"
          onPress={onCancelProfile}
          disabled={!isDirty || isSubmitting}
        >
          <Text className="text-sm font-medium text-white">Cancelar</Text>
        </Pressable>
        <Pressable
          className={`px-4 py-3 rounded-2xl ${
            isDirty ? "bg-green-600" : "bg-green-600/50"
          }`}
          onPress={handleSubmit(onSubmitProfile)}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-sm font-semibold text-white">
              Salvar alterações
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileInfoForm;
