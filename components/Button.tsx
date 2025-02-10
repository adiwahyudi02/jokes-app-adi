import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { colors } from "@/constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}) => {
  const backgroundColor =
    variant === "ghost"
      ? "transparent"
      : disabled
      ? colors.disabled
      : colors[variant];

  const textColor =
    variant === "ghost" || variant === "outline"
      ? colors.primary
      : disabled
      ? colors.darkGray
      : "#FFFFFF";

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor },
        variant === "outline" && {
          borderWidth: 1,
          borderColor: colors.primary,
        },
        variant === "ghost" && { borderWidth: 1, borderColor: "transparent" },
      ]}
      activeOpacity={0.7}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} testID="activity-indicator" />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
