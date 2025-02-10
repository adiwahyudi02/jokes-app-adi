import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AccordionItemProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  renderTitle: () => React.ReactNode;
  renderExpanded: () => React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen,
  onOpen,
  onClose,
  renderTitle,
  renderExpanded,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={isOpen ? onClose : onOpen}
      >
        <View style={styles.titleContainer}>
          {renderTitle()}
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.expandedContainer}>{renderExpanded()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    overflow: "hidden",
    marginBottom: 8,
  },
  header: {
    padding: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandedContainer: {
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 10,
  },
});
