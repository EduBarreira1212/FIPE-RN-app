import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { View, TextInput, Pressable, Text, Alert } from "react-native";
import { SignInInput, signInSchema } from "../schemas/signIn";
import { useAuth } from "../hooks/useAuth";

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { signIn } = useAuth();

  const onSubmit = async (data: SignInInput) => {
    try {
      await signIn(data);
      reset();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <View className="items-center justify-center flex-1 w-[95%] gap-3">
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
                returnKeyType="next"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text className="text-red-600">{errors.email.message}</Text>
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
              {errors.password && <Text>{errors.password.message}</Text>}
            </>
          )}
        />
      </View>
      {errors.root && (
        <Text className="text-red-600">{errors.root.message}</Text>
      )}
      <Pressable
        className="bg-green-400 w-2/4 items-center rounded-lg p-3 my-2 on active:bg-green-500"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
      >
        <Text className="text-lg">{isSubmitting ? "Loading..." : "Login"}</Text>
      </Pressable>
      <Link href={"/sign-up"} className="p-3">
        <Text className="text-black">Não possui uma conta?</Text>
      </Link>
    </View>
  );
};

export default SignInForm;
