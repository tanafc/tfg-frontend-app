import { Text, View } from "react-native";

type CustomMarkerProps = {
  price: string;
  variant?: "primary" | "secondary";
};

const CustomMarker = ({ price, variant = "primary" }: CustomMarkerProps) => {
  const backgroundColor = variant === "secondary" ? "#e35335" : "green";

  return (
    <View style={{ backgroundColor: backgroundColor, borderRadius: 10 }}>
      <Text style={{ color: "white", padding: 8 }}>{price}€</Text>
    </View>
  );
};

export default CustomMarker;
