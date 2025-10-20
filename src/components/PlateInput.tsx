import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { getPlateType, liveFormat, normalizeRaw } from "../utils/plate";
import { router } from "expo-router";
import { plateSchema } from "../schemas/plate";
import { Ionicons } from "@expo/vector-icons";

const PlateInput = () => {
  const [plate, setPlate] = useState<string>(normalizeRaw(""));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (text: string) => {
    setPlate(liveFormat(text));
  };

  const validateNow = () => {
    const parsed = plateSchema.safeParse(plate);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Placa inválida.");
      return { ok: false as const };
    }
    const finalValue = parsed.data;
    setPlate(finalValue);
    setError(null);
    return { ok: true as const, finalValue };
  };

  const handleBlur = () => {
    validateNow();
  };

  const handleConsult = () => {
    const res = validateNow();
    if (!res.ok) return;

    const finalValue = res.finalValue!;
    router.push(`/result/${finalValue}`);
  };

  const isInvalid = !!error;

  return (
    <View>
      <TextInput
        className={`border rounded-md p-4 text-center text-xl ${
          isInvalid ? "border-red-500" : "border-gray-500"
        }`}
        placeholder="AAA-1234 ou AAA1A11"
        value={plate}
        onChangeText={handleChange}
        onBlur={handleBlur}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={8}
      />
      {isInvalid ? (
        <Text className="text-red-600">{error}</Text>
      ) : plate.length > 0 ? (
        <Text className="text-green-700">
          Formato válido (
          {getPlateType(plate) === "old" ? "Antiga" : "Mercosul"})
        </Text>
      ) : null}
      <Pressable
        className="bg-green-400 w-full flex-row items-center justify-center gap-3 rounded-lg p-3 my-2 active:bg-green-500"
        onPress={handleConsult}
      >
        <Ionicons name="search-outline" size={35} color="black" />
        <Text className="text-lg font-semibold">Consultar</Text>
      </Pressable>
    </View>
  );
};

export default PlateInput;
