import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import { Fonts } from "../constants/fonts";
import { addProject } from "../store/addProjectSlice";
import { AppDispatch } from "../store/store";
import { DeviceHelper } from "../utils/helper";
import { FormField } from "./Login";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const sendPushNotification = async(expoPushToken: string)=> {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Created',
    body: ' Project Created Succesfully',
    data: { someData: 'goes here' },
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

}


function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}



const CreateProject: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const projectForm: Array<FormField> = [
    {
      key: "title",
      name: "title",
      icon: "tag",
      placeholder: "Project Title",
      isSecure: false,
      rules: {
        required: "Title is required",
        minLength: {
          value: 3,
          message: "Title should be atleast 3 characters",
        },
      },
    },
    {
      key: "description",
      name: "description",
      icon: "infocirlce",
      placeholder: "Enter project description",
      isSecure: false,
      rules: {
        required: "Description is required",
        minLength: {
          value: 4,
          message: "Description should be of atleast 4 words",
        },
      },
    },
  ];

  const handleAddProject = async (data: FieldValues) => {
    try {
      const response = await dispatch(addProject(data));
     // console.log('res',response);
      if(response){
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabNavigator' }],
          });
        Alert.alert("Success✅", "Project Created Successfully", [
          { text: "close" },
        ]);
        await sendPushNotification(expoPushToken);
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert("Failed", "Something went wrong, please try again", [
        { text: "close" },
      ]);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <Text style={styles.title}>Add New Project</Text>
        <Image
          style={styles.image}
          source={require("../assets/images/addProject.png")}
        />
        <View>
          {projectForm.map((field) => (
            <CustomTextInput
              key={field.key}
              placeholder={field.placeholder}
              name={field.name}
              icon={field.icon}
              secureTextEntry={field.isSecure ?? false}
              control={control}
              rules={field.rules}
            />
          ))}
          <CustomButton onPress={handleSubmit(handleAddProject)}>
            <Icon name="addfolder" size={25} color={"white"} />
            <Text>Add project</Text>
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    gap: 20,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 34,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    ...Platform.select({
      android: {
        height: DeviceHelper.calculateWidthRatio(350),
        width: DeviceHelper.calculateHeightRatio(320),
      },
      ios: {
        height: DeviceHelper.calculateWidthRatio(400),
        width: DeviceHelper.calculateHeightRatio(320),
      },
    }),
  },
});
