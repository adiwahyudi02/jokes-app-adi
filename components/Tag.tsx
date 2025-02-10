import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";

interface TagProps {
  label: string;
  variant?: "primary" | "secondary" | "outline";
}

export const Tag: React.FC<TagProps> = ({ label, variant = "primary" }) => {
  return (
    <View
      testID="tag-container"
      style={[
        styles.base,
        {
          backgroundColor:
            variant === "outline" ? "transparent" : colors[variant],
          borderColor: variant === "outline" ? colors.primary : "transparent",
        },
        variant === "outline" && styles.outline,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: variant === "outline" ? colors.primary : colors.white },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  outline: {
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
