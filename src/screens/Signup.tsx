import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { useForm, FieldValues } from "react-hook-form";
import { FormField } from "./Login";
import { DeviceHelper } from "../utils/helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import getResponse from "../utils/httpResponse";
import { endpoints } from "../constants/endPoint";
import { AxiosResponse } from "axios";
import { Screen } from "react-native-screens";
import { Colors } from "../constants/colors";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Signup: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();


  const [checked, setChecked] = useState<boolean>(false);

  const handleSignup = async (data: FieldValues) => {
    try {
      const response: AxiosResponse = await getResponse(
        "post",
        endpoints.signup,
        data
      );
      //console.log(JSON.stringify(response.data.data.data, null, 4));
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigation.navigate("Login");
  };
  const formData: Array<FormField> = [
    {
      key: "name",
      name: "name",
      icon: "user",
      placeholder: "Enter your name",
      isSecure: false,
      rules: {
        required: "Name is required",
        minLength: { value: 3 },
      },
    },
    {
      key: "email",
      name: "email",
      icon: "mail",
      placeholder: "Email Address",
      isSecure: false,
      rules: {
        required: "Email is required",
        pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
      },
    },
    {
      key: "password",
      name: "password",
      icon: "lock",
      placeholder: "Password",
      isSecure: true,
      rules: {
        required: "Password is required",
        minLength: { value: 8 },
        message: "Password should be at least 8 characters long",
      },
    },
    {
      key: "contact",
      name: "phone",
      icon: "contacts",
      placeholder: "contact",
      isSecure: false,
      rules: {
        required: "Contact is required",
        minLength: { value: 10 },
        message: "Enter valid phone number",
      },
      keyboardType: "number-pad",
    },
  ];

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <ScrollView>
          <Image
            style={styles.logo}
            resizeMode={"contain"}
            source={require("../assets/images/splash_icon.png")}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.title}>Welcome!</Text>
            {formData.map((formField) => (
              <CustomTextInput
                key={formField.key}
                placeholder={formField.placeholder}
                name={formField.name}
                icon={formField.icon}
                secureTextEntry={formField.isSecure}
                control={control}
                rules={formField.rules}
                keyboardType={formField.keyboardType}
              />
            ))}

            <View style={styles.privacyContainer}>
              <Pressable
                style={styles.pressedIcon}
                onPress={() => setChecked(!checked)}
              >
                <Image
                  style={checked ? { opacity: 1 } : { opacity: 0 }}
                  source={require("../assets/images/checkIcon.png")}
                />
              </Pressable>
              <Text style={styles.privacyPolicyText}>
                By pressing continue you agree to our
                <Text style={{ color: "#F56600" }}>
                  terms and conditions
                </Text>{" "}
                and
                <Text style={{ color: "#F56600" }}> privacy policy</Text>
              </Text>
            </View>
            <CustomButton
              disabled={
                errors.Name ||
                errors.Email ||
                errors.Password ||
                errors.confirmPassword
                  ? true
                  : false
              }
              onPress={handleSubmit(handleSignup)}
            >
              Register
            </CustomButton>
            <Text onPress={handleNavigate} style={styles.endText}>
              Already Have a account?
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.priorityColor,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  logo: {
    width: DeviceHelper.width(),
    height: DeviceHelper.calculateHeightRatio(145),
  },
  signupContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "",
    fontSize: 50,
    fontWeight: "700",
    color: Colors.titleColor,
    marginBottom: 10,
    textAlign: "left",
  },
  subtitle: {
    fontFamily: "",
    fontSize: 19,
    fontWeight: "500",
    color: Colors.titleColor,
    textAlign: "left",
    marginBottom: 20,
  },
  privacyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  privacyPolicyText: {
    color: Colors.titleColor,
  },
  pressedIcon: {
    borderWidth: 1,
    borderColor: Colors.titleColor,
    borderRadius: 5,
    height: 17,
  },
  endText: {
    color: Colors.titleColor,
    fontSize: 16,
    alignSelf: "center",
  },
});
