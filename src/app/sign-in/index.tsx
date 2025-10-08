import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <SafeAreaView className="flex-1 items-center">
      <Text className="text-2xl">Login</Text>
      <View className="items-center justify-center flex-1 w-[95%] gap-3">
        <View className="w-3/4">
          <Text className="text-xl">E-mail</Text>
          <TextInput
            className="my-2 bg-slate-200 p-2 rounded-md w-full text-base"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="w-3/4">
          <Text className="text-xl">Senha</Text>
          <TextInput
            className="my-2 bg-slate-200 p-2 rounded-md w-full text-base"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Pressable
          className="bg-green-400 w-2/4 items-center rounded-lg p-3 my-2 on active:bg-green-500"
          onPress={handleSubmit}
        >
          <Text className="text-lg">Login</Text>
        </Pressable>
        <Link href={"/sign-up"} className="p-3">
          <Text className="text-black">Não possui uma conta?</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignInPage;
