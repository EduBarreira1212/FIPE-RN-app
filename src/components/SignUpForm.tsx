import React, { useRef, useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SignUpInput, signUpSchema } from "../schemas/signUp";
import { useAuth } from "../hooks/useAuth";

const SignUpForm = () => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTos, setAgreeTos] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
    mode: "onChange",
  });

  const { signUp } = useAuth();

  const password = watch("password");

  const strength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4); // 0..4
  }, [password]);

  const strengthLabel =
    ["Fraca", "Ok", "Boa", "Forte", "Excelente"][strength] ?? "Fraca";

  const inputBase =
    "w-full rounded-xl border px-4 py-3 text-base bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700";
  const inputError = "border-red-500";
  const labelBase = "text-neutral-700 dark:text-neutral-200 mb-1 font-medium";
  const helperText = "text-neutral-500 dark:text-neutral-400 mt-1";
  const errorText = "text-red-600 dark:text-red-400 mt-1";

  const onSubmit = async (data: SignUpInput) => {
    try {
      if (!agreeTos) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(
          "Termos de uso",
          "Você precisa aceitar os termos para continuar."
        );
        return;
      }
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await signUp(data);
      reset();
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e: any) {
      console.log(e);
      Alert.alert(
        "Erro ao criar conta",
        "Tente novamente em alguns instantes."
      );
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 w-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center w-full py-6 px-5">
            <View className="w-full max-w-md">
              <View className="mb-6">
                <Text className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Crie sua conta
                </Text>
                <Text className={helperText}>Leva menos de um minuto.</Text>
              </View>
              <View className="mb-4">
                <Text className={labelBase}>Nome</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`${inputBase} ${errors.name ? inputError : ""}`}
                      placeholder="Nome completo"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="words"
                      returnKeyType="next"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      accessibilityLabel="Campo de nome completo"
                      onSubmitEditing={() => emailRef.current?.focus()}
                    />
                  )}
                />
                {errors.name ? (
                  <Text className={errorText}>{errors.name.message}</Text>
                ) : (
                  <Text className={helperText}>
                    Como está no seu documento.
                  </Text>
                )}
              </View>
              <View className="mb-4">
                <Text className={labelBase}>E-mail</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      ref={emailRef}
                      className={`${inputBase} ${errors.email ? inputError : ""}`}
                      placeholder="seuemail@exemplo.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="emailAddress"
                      returnKeyType="next"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      accessibilityLabel="Campo de e-mail"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  )}
                />
                {errors.email ? (
                  <Text className={errorText}>{errors.email.message}</Text>
                ) : (
                  <Text className={helperText}>
                    Usaremos para confirmar sua conta.
                  </Text>
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
                        placeholder="Crie uma senha"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="newPassword"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        accessibilityLabel="Campo de senha"
                        onSubmitEditing={() => confirmRef.current?.focus()}
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
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
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
                    Use 8+ caracteres com letras, números e símbolos.
                  </Text>
                )}
                <View className="mt-2">
                  <View className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <View
                      className={`h-2 rounded-full ${
                        [
                          "bg-red-500",
                          "bg-yellow-500",
                          "bg-green-500",
                          "bg-emerald-600",
                          "bg-emerald-700",
                        ][strength]
                      }`}
                      style={{ width: `${(strength / 4) * 100}%` }}
                    />
                  </View>
                  <Text className="text-xs mt-1 text-neutral-500 dark:text-neutral-400">
                    Força da senha: {strengthLabel}
                  </Text>
                </View>
              </View>
              <View className="mb-4">
                <Text className={labelBase}>Confirme sua senha</Text>
                <Controller
                  control={control}
                  name="confirm"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="relative">
                      <TextInput
                        ref={confirmRef}
                        className={`${inputBase} pr-12 ${errors.confirm ? inputError : ""}`}
                        placeholder="Repita a senha"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showConfirm}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="oneTimeCode"
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        accessibilityLabel="Campo de confirmação de senha"
                      />
                      <Pressable
                        onPress={() => setShowConfirm((s) => !s)}
                        accessibilityRole="button"
                        accessibilityLabel={
                          showConfirm
                            ? "Ocultar confirmação"
                            : "Mostrar confirmação"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                        hitSlop={8}
                      >
                        <MaterialCommunityIcons
                          name={showConfirm ? "eye-off-outline" : "eye-outline"}
                          size={22}
                          color="#6B7280"
                        />
                      </Pressable>
                    </View>
                  )}
                />
                {errors.confirm ? (
                  <Text className={errorText}>{errors.confirm.message}</Text>
                ) : (
                  <Text className={helperText}>
                    As senhas devem ser iguais.
                  </Text>
                )}
              </View>
              <Pressable
                onPress={() => setAgreeTos((v) => !v)}
                className="flex-row items-center mb-6"
                accessibilityRole="checkbox"
                accessibilityState={{ checked: agreeTos }}
                accessibilityLabel="Aceitar termos de uso e política de privacidade"
                hitSlop={8}
              >
                <MaterialCommunityIcons
                  name={agreeTos ? "checkbox-marked" : "checkbox-blank-outline"}
                  size={22}
                  color={agreeTos ? "#10B981" : "#6B7280"}
                />
                <Text className="ml-2 text-neutral-700 dark:text-neutral-200">
                  Concordo com os{" "}
                  <Text className="text-blue-600 dark:text-blue-400">
                    Termos
                  </Text>{" "}
                  e a{" "}
                  <Text className="text-blue-600 dark:text-blue-400">
                    Privacidade
                  </Text>
                  .
                </Text>
              </Pressable>
              {errors.root && (
                <Text className={`${errorText} mb-2`}>
                  {errors.root.message}
                </Text>
              )}
              <Pressable
                className={`w-full items-center rounded-xl py-3.5
                  ${
                    !isValid || isSubmitting || !agreeTos || !isDirty
                      ? "bg-green-300 dark:bg-green-800/40"
                      : "bg-green-500 active:bg-green-600"
                  }
                `}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting || !agreeTos || !isDirty}
                accessibilityRole="button"
                accessibilityLabel="Criar conta"
              >
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-white text-base font-semibold">
                    Criar conta
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
                <Link href="/sign-in">
                  <Text className="text-neutral-700 dark:text-neutral-200">
                    Já possui uma conta?{" "}
                    <Text className="text-blue-600 dark:text-blue-400 font-semibold">
                      Entrar
                    </Text>
                  </Text>
                </Link>
              </View>
              <Text className="text-[12px] text-neutral-400 text-center mt-6">
                Seus dados são protegidos. Nunca compartilhamos suas
                credenciais.
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;
