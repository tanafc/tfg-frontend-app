import React, { FC } from "react";
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export enum CustomButtonTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

type CustomButtonProps = {
  text: string;
  onPress: (event: NativeSyntheticEvent<NativeTouchEvent>) => void;
  type?: CustomButtonTypes;
  disabled?: boolean;
};

const CustomButton: FC<CustomButtonProps> = ({
  text,
  type = CustomButtonTypes.PRIMARY,
  onPress,
  disabled = false
}) => {
  if (type === CustomButtonTypes.TERTIARY) {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.container, styles.container_tertiary]}
        disabled={disabled}
      >
        <Text style={[styles.text, styles.text_tertiary]}>{text}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles.container_primary]}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },

  container_primary: {
    backgroundColor: "#f58b54",
  },

  container_tertiary: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_tertiary: {
    color: "grey",
  },
});

export default CustomButton;
