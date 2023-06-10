import React, { FC } from "react";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Pressable,
  StyleSheet,
  Text
} from "react-native";

export type CustomButtonTypes = "primary" | "secondary"

type CustomButtonProps = {
  text: string;
  onPress: (event: NativeSyntheticEvent<NativeTouchEvent>) => void;
  type?: CustomButtonTypes;
  disabled?: boolean;
  loading?: boolean;
};

const CustomButton: FC<CustomButtonProps> = ({
  text,
  type = "primary",
  onPress,
  disabled = false,
  loading = false,
}) => {
  if (type === "secondary") {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.container,
          styles.container_tertiary,
          disabled || loading ? styles.container_disabled : {},
        ]}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#f58b54" />
        ) : (
          <Text style={[styles.text, styles.text_tertiary]}>{text}</Text>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        styles.container_primary,
        disabled || loading ? styles.container_disabled : {},
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
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

  container_disabled: {
    opacity: 0.5,
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
