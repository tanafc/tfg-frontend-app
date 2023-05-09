import { FC, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type CustomInputProps = {
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input: {},

  text_label: {
    textAlign: "left",
  },
});

export default CustomInput;
