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
} from "react-native";
import { SignUpInput, signUpSchema } from "../schemas/signUp";
import { useAuth } from "../hooks/useAuth";

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    mode: "onChange",
  });

  const { signUp } = useAuth();

  const onSubmit = async (data: SignUpInput) => {
    try {
      await signUp(data);
      reset();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 w-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center w-full py-6">
            <View className="items-center justify-center flex-1 w-[95%] gap-3">
              <View className="w-3/4">
                <Text className="text-xl">Nome</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        className="my-2 bg-slate-200 p-2 rounded-md w-full text-base"
                        placeholder="Nome completo"
                        autoCapitalize="words"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.name && (
                        <Text className="text-red-600">
                          {errors.name.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              <View className="w-3/4">
                <Text className="text-xl">E-mail</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        className="my-2 bg-slate-200 p-2 rounded-md w-full text-base"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.email && (
                        <Text className="text-red-600">
                          {errors.email.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              <View className="w-3/4">
                <Text className="text-xl">Senha</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        className="my-2 bg-slate-200 p-2 rounded-md w-full text-base"
                        placeholder="Senha"
                        secureTextEntry
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.password && (
                        <Text className="text-red-600">
                          {errors.password.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              <View className="w-3/4">
                <Text className="text-xl">Confirme sua senha</Text>
                <Controller
                  control={control}
                  name="confirm"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        className="my-2 bg-slate-200 p-2 rounded-md w-full text-base"
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.confirm && (
                        <Text className="text-red-600">
                          {errors.confirm.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              {errors.root && (
                <Text className="text-red-600">{errors.root.message}</Text>
              )}

              <Pressable
                className="bg-green-400 w-2/4 items-center rounded-lg p-3 my-2 active:bg-green-500"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting}
              >
                <Text className="text-lg">
                  {isSubmitting ? "Loading..." : "Criar"}
                </Text>
              </Pressable>

              <Link href={"/sign-in"} className="p-3">
                <Text className="text-black">Já possui uma conta?</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;
