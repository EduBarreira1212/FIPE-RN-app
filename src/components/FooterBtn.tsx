import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IFooterBtnProps {
  active: boolean;
  icon: any;
  text: string;
  onPress?: () => void;
}

const FooterBtn = ({ active, icon, text, onPress }: IFooterBtnProps) => {
  return (
    <Pressable
      className="items-center gap-1"
      disabled={active}
      onPress={onPress}
    >
      <Ionicons name={icon} size={35} color={active ? "#4ade80" : "black"} />
      <Text className={`${active ? "text-green-400" : "black"} font-semibold`}>
        {text}
      </Text>
    </Pressable>
  );
};

export default FooterBtn;
