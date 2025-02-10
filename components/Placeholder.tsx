import { colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";

interface PlaceholderProps {
  count?: number;
  isVisible?: boolean;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  count = 2,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <View>
      {[...Array(count)].map((_, index) => (
        <View
          key={index}
          style={styles.placeholder}
          testID="placeholder-container"
        >
          <View style={styles.placeholderItem} />
          <View style={styles.placeholderItem} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  placeholderItem: {
    height: 20,
    backgroundColor: colors.gray,
    borderRadius: 4,
  },
});
