import React, { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardTypeOptions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { DeviceHelper } from "../utils/helper";
import { Colors } from "../constants/colors";

interface CustomTextInputProps {
  icon: string;
  name: string;
  control?: Control<FieldValues>;
  rules?: {};
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  icon,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  onChangeText,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: error ? "red" : "#e8e8e8",
                borderRadius: name === "search" ? 25 : 8,
              },
            ]}
          >
            {name !== "search" && (
              <Icon name={icon} size={20} color="black" style={styles.icon} />
            )}
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(text);
                if (onChangeText) {
                  onChangeText(text);
                }
              }}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input, { paddingHorizontal: 20 }]}
              secureTextEntry={isPasswordVisible}
              placeholderTextColor={name === "search" ? "gray" : "black"}
              keyboardType={keyboardType}
              {...(name === "description"
                ? { multiline: true, numberOfLines: 4 }
                : {})}
            />
            {name === "search" && (
              <Icon
                name="search1"
                size={20}
                color="black"
                style={styles.icon}
              />
            )}
            {secureTextEntry && (
              <Icon
                style={[styles.icon, styles.eyeIcon]}
                name={isPasswordVisible ? "eyeo" : "eye"}
                size={20}
                color="black"
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              />
            )}
          </View>
          {error && (
            <Text style={styles.error}>{error.message || "Error"}</Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteBackGround,
    borderColor: Colors.whiteBackGround,
    borderWidth: 1,
    borderRadius: 8,
    height: DeviceHelper.calculateWidthRatio(60),
  },
  icon: {
    marginLeft: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.titleColor,
  },
  error: {
    color: "red",
    fontSize: 10,
    alignSelf: "flex-end",
    paddingTop: 4,
  },
  eyeIcon: {
    marginRight: 10,
  },
});
