import React, { useState } from "react";
import { View, Modal, Alert, Text, Button, StyleSheet } from "react-native";
import { DeviceHelper } from "../utils/helper";
import CustomButton from "./CustomButton";

interface modalProps {
  modalVisible: boolean;
  closeModal: () => void;
  children:React.ReactNode;
}

const ModalView: React.FC<modalProps> = ({ modalVisible, closeModal, children }) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <CustomButton onPress={closeModal}>Close</CustomButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    width:DeviceHelper.calculateWidthRatio(400),
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
