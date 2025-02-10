import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Button } from "./Button";

interface DialogProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog = ({ isVisible, onClose, children }: DialogProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      testID="dialog-backdrop"
    >
      <View style={styles.dialog} testID="dialog-container">
        <View style={styles.text}>{children}</View>
        <Button title="OK" variant="ghost" onPress={onClose}>
          OK
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  text: {
    color: "#333",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
