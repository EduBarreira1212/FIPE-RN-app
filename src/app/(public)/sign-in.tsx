import { Pressable, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInForm from "../../components/SignInForm";

const SignInPage = () => {
  return (
    <SafeAreaView className="flex-1 items-center">
      <Text className="text-2xl">Login</Text>
      <SignInForm />
    </SafeAreaView>
  );
};

export default SignInPage;
