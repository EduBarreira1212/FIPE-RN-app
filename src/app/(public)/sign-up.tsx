import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpForm from "../../components/SignUpForm";

const SignUpPage = () => {
  return (
    <SafeAreaView className="flex-1 items-center">
      <Text className="text-2xl">Crie sua conta</Text>
      <SignUpForm />
    </SafeAreaView>
  );
};

export default SignUpPage;
