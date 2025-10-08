import { Link } from "expo-router";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <ImageBackground source={require("../../assets/onboarding-bg/app-bg.png")}>
      <SafeAreaView>
        <View className="h-full items-center justify-between">
          <Image
            source={require("../../assets/logo.png")}
            className="w-[150px] h-[150px] "
          />

          <View className="w-full items-center mb-5">
            <Link href={"/sign-up"} className="text-white" asChild>
              <Pressable className="bg-green-400 w-3/4 items-center rounded-lg p-3 my-2 on active:bg-green-500">
                <Text className="text-lg">Criar conta</Text>
              </Pressable>
            </Link>

            <View className="flex-row">
              <Text className="text-lg text-white">Já tem uma conta? </Text>
              <Link href={"/sign-in"} className="text-white">
                <Text className="text-lg text-green-400">Acesse agora!</Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
