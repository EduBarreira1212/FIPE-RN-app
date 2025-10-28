import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PasswordModal from "../../../components/PasswordModal";
import { ProfileHeader } from "../../../components/ProfileHeader";
import ProfileInfoForm from "../../../components/ProfileInfoForm";

const ProfilePage = () => {
  const [pwdModalOpen, setPwdModalOpen] = useState(false);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-zinc-950">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        className="flex-1 px-4"
      >
        <ProfileHeader />
        <ProfileInfoForm />
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
      <PasswordModal
        visible={pwdModalOpen}
        onClose={() => setPwdModalOpen(false)}
      />
    </SafeAreaView>
  );
};

export default ProfilePage;
