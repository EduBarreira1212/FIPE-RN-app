import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SignInInput, signInSchema } from "../schemas/signIn";
import { useAuth } from "../hooks/useAuth";

const SignInForm = () => {
  const passwordRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { signIn } = useAuth();

  const onSubmit = async (data: SignInInput) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await signIn(data);
      reset();
    } catch (e: any) {
      console.log(e);
      Alert.alert(
        "Erro ao fazer login",
        "Verifique suas credenciais e tente novamente."
      );
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const inputBase =
    "w-full rounded-xl border px-4 py-3 text-base bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700";
  const inputError = "border-red-500";
  const labelBase = "text-neutral-700 dark:text-neutral-200 mb-1 font-medium";
  const helperText = "text-neutral-500 dark:text-neutral-400 mt-1";
  const errorText = "text-red-600 dark:text-red-400 mt-1";

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-5 py-6">
          <View className="w-full max-w-md">
            <View className="mb-6">
              <Text className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Bem-vindo de volta
              </Text>
              <Text className={helperText}>
                Acesse sua conta para continuar.
              </Text>
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className={labelBase}>E-mail</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`${inputBase} ${errors.email ? inputError : ""}`}
                    placeholder="seuemail@exemplo.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    accessibilityLabel="Campo de e-mail"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                )}
              />
              {errors.email ? (
                <Text className={errorText}>{errors.email.message}</Text>
              ) : (
                <Text className={helperText}>Use o e-mail cadastrado.</Text>
              )}
            </View>
            <View className="mb-2">
              <Text className={labelBase}>Senha</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="relative">
                    <TextInput
                      ref={passwordRef}
                      className={`${inputBase} pr-12 ${errors.password ? inputError : ""}`}
                      placeholder="Sua senha"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      returnKeyType="go"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      accessibilityLabel="Campo de senha"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                    <Pressable
                      onPress={() => setShowPassword((s) => !s)}
                      accessibilityRole="button"
                      accessibilityLabel={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                      hitSlop={8}
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#6B7280"
                      />
                    </Pressable>
                  </View>
                )}
              />
              {errors.password ? (
                <Text className={errorText}>{errors.password.message}</Text>
              ) : (
                <Text className={helperText}>
                  Mantenha sua senha em sigilo.
                </Text>
              )}
            </View>
            {errors.root && (
              <Text className={`${errorText} mb-2`}>{errors.root.message}</Text>
            )}
            <View className="items-end mb-6">
              <Link href="/forgot-password">
                <Text className="text-sm text-blue-600 dark:text-blue-400">
                  Esqueceu a senha?
                </Text>
              </Link>
            </View>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting || !isDirty}
              accessibilityRole="button"
              accessibilityLabel="Entrar"
              className={`w-full items-center rounded-xl py-3.5
                ${
                  !isValid || isSubmitting || !isDirty
                    ? "bg-green-300 dark:bg-green-800/40"
                    : "bg-green-500 active:bg-green-600"
                }`}
            >
              {isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Entrar
                </Text>
              )}
            </Pressable>
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
              <Text className="mx-3 text-neutral-500 dark:text-neutral-400 text-sm">
                ou
              </Text>
              <View className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
            </View>
            <View className="items-center">
              <Link href="/sign-up">
                <Text className="text-neutral-700 dark:text-neutral-200">
                  Não possui uma conta?{" "}
                  <Text className="text-blue-600 dark:text-blue-400 font-semibold">
                    Cadastre-se
                  </Text>
                </Text>
              </Link>
            </View>

            <Text className="text-[12px] text-neutral-400 text-center mt-6">
              Seus dados são protegidos. Nunca compartilhamos suas credenciais.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInForm;
