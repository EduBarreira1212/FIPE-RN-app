import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../hooks/useAuth";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileForm, profileSchema } from "../../../schemas/profile";
import { PasswordForm, passwordSchema } from "../../../schemas/passwordUpdate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../../services/httpClient";

const ProfilePage = () => {
  const [pwdModalOpen, setPwdModalOpen] = useState(false);

  const { userId } = useLocalSearchParams();
  const { user, token, signOut } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
    watch,
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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user", "update", userId],
    mutationFn: async (params: ProfileForm) => {
      await httpClient.put(`/users/${userId}`, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", token] });
    },
  });

  const { mutateAsync: updatePassword } = useMutation({
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

  const onSubmitProfile = async (data: ProfileForm) => {
    const changedName = data.name.trim() !== (user?.name ?? "");
    const changedEmail = data.email.trim() !== (user?.email ?? "");

    try {
      if (changedName || changedEmail) {
        console.log(data);
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

  const {
    control: pwdControl,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: pwdErrors, isSubmitting: pwdSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPwd: "", newPwd: "", confirmPwd: "" },
  });

  useEffect(() => {
    if (!pwdModalOpen) {
      resetPwd({ currentPwd: "", newPwd: "", confirmPwd: "" });
    }
  }, [pwdModalOpen, resetPwd]);

  const onSubmitPassword = async (data: PasswordForm) => {
    try {
      await updatePassword(data);
      setPwdModalOpen(false);
      Alert.alert("Senha alterada!", "Sua senha foi atualizada com sucesso.");
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Não foi possível alterar a senha.");
    }
  };

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
            <Text className="text-red-600 text-xs mt-1">
              {errors.name.message}
            </Text>
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
        </View>
        <View className="flex-row justify-end gap-3">
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
        <View className="mt-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 p-4">
          <Text className="text-base font-semibold mb-3">Segurança</Text>
          <Text className="text-xs text-zinc-500 mb-3">
            Para alterar a senha, toque no botão abaixo.
          </Text>
          <Pressable
            className="self-start px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700"
            onPress={() => setPwdModalOpen(true)}
          >
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={18} />
              <Text className="ml-2 text-sm font-medium">Alterar senha</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <Modal visible={pwdModalOpen} animationType="slide" transparent>
        <View className="flex-1 justify-center bg-black/50">
          <View className="bg-white dark:bg-zinc-900 p-4 rounded-3xl">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold">Alterar senha</Text>
              <Pressable onPress={() => setPwdModalOpen(false)}>
                <Ionicons name="close" size={24} />
              </Pressable>
            </View>
            <Text className="text-xs text-zinc-500 mb-1">Senha atual</Text>
            <Controller
              control={pwdControl}
              name="currentPwd"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className={`rounded-xl px-3 py-2 border ${
                    pwdErrors.currentPwd
                      ? "border-red-500"
                      : "border-black/10 dark:border-white/10"
                  } bg-white dark:bg-zinc-800`}
                  placeholder="••••••••"
                />
              )}
            />
            {pwdErrors.currentPwd && (
              <Text className="text-red-600 text-xs mt-1">
                {pwdErrors.currentPwd.message}
              </Text>
            )}
            <Text className="text-xs text-zinc-500 mt-3 mb-1">Nova senha</Text>
            <Controller
              control={pwdControl}
              name="newPwd"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className={`rounded-xl px-3 py-2 border ${
                    pwdErrors.newPwd
                      ? "border-red-500"
                      : "border-black/10 dark:border-white/10"
                  } bg-white dark:bg-zinc-800`}
                  placeholder="Mínimo 8 caracteres"
                />
              )}
            />
            {pwdErrors.newPwd && (
              <Text className="text-red-600 text-xs mt-1">
                {pwdErrors.newPwd.message}
              </Text>
            )}
            <Text className="text-xs text-zinc-500 mt-3 mb-1">
              Confirmar nova senha
            </Text>
            <Controller
              control={pwdControl}
              name="confirmPwd"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className={`rounded-xl px-3 py-2 border ${
                    pwdErrors.confirmPwd
                      ? "border-red-500"
                      : "border-black/10 dark:border-white/10"
                  } bg-white dark:bg-zinc-800`}
                  placeholder="Repita a nova senha"
                />
              )}
            />
            {pwdErrors.confirmPwd && (
              <Text className="text-red-600 text-xs mt-1">
                {pwdErrors.confirmPwd.message}
              </Text>
            )}
            <View className="flex-row justify-center gap-3 mt-4">
              <Pressable
                className="px-4 py-3 rounded-2xl bg-zinc-200 dark:bg-zinc-800"
                onPress={() => setPwdModalOpen(false)}
                disabled={pwdSubmitting}
              >
                <Text className="text-sm font-medium">Cancelar</Text>
              </Pressable>
              <Pressable
                className={`px-4 py-3 rounded-2xl bg-green-600 ${
                  pwdSubmitting ? "opacity-70" : ""
                }`}
                onPress={handlePwdSubmit(onSubmitPassword)}
                disabled={pwdSubmitting}
              >
                {pwdSubmitting ? (
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
    </SafeAreaView>
  );
};

export default ProfilePage;
