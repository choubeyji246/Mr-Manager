import React from 'react';
import { Alert, Image, KeyboardTypeOptions, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FieldValues, useForm } from 'react-hook-form';
import { DeviceHelper } from '../utils/helper';
import getResponse from '../utils/httpResponse';
import { endpoints } from '../constants/endPoint';
import { AxiosResponse } from 'axios';
import { tokenStorage } from '../utils/storage';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import  Icon  from 'react-native-vector-icons/AntDesign';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface FormField {
  key: string;
  name: string;
  icon: string;
  placeholder: string;
  isSecure?: boolean;
  rules: Record<string, any>;
  keyboardType?: KeyboardTypeOptions;
}



const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const form: Array<FormField> = [
    {
      key: 'email',
      name: 'email',
      icon: 'mail',
      placeholder: 'Email Address',
      isSecure: false,
      rules: {
        required: 'Email is required',
        pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
      },
    },
    {
      key: 'password',
      name: 'password',
      icon: 'lock',
      placeholder: 'Password',
      isSecure: true,
      rules: {
        required: 'Password is required',
        minLength: { value: 8, message: 'Password should be at least 8 characters long' },
      },
    },
  ];

  const { control, handleSubmit, formState: { errors } } = useForm<FieldValues>();

 // console.log(errors);

  const handleLogin = async (data: FieldValues) => {
    try {
      const response: AxiosResponse = await getResponse("post", endpoints.login, data);
      await tokenStorage(response.data.data.data);
      navigation.navigate('TabNavigator', { screen: 'Dashboard', params: { email: data.email } });
    } catch (error) {
      Alert.alert("Failed!", "Wrong email or password", [{ text: "close" }]);
      console.log(error);
    }
  };

  const handleNavigateHandler = () => {
    navigation.navigate('Signup');
  };

  const handleGoogleSignIn = ()=>{

  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../assets/images/splash_icon.png')}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Mr Manager is your ultimate project management tool designed to streamline your workflow and boost productivity
          </Text>
          {form.map(formField => (
            <CustomTextInput
              key={formField.key}
              placeholder={formField.placeholder}
              name={formField.name}
              icon={formField.icon}
              secureTextEntry={formField.isSecure ?? false}
              control={control}
              rules={formField.rules}
            />
          ))}

          <Text style={styles.text}>Forgot Password?</Text>
          <CustomButton
            onPress={handleSubmit(handleLogin)}
            disabled={errors.email || errors.password ? true : false}
          >
            Login
          </CustomButton>
          <CustomButton onPress={handleGoogleSignIn}>
            <Icon name="google" color="red" size={20}/>
             Sign In With Google
          </CustomButton>
          <Text style={styles.endText} onPress={handleNavigateHandler}>
            Create account
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.priorityColor,
    paddingTop:50
  },
  logo: {
    width: DeviceHelper.width(),
    height: DeviceHelper.calculateHeightRatio(145),
    marginBottom: 40,
  },
  loginContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 50,
    //fontWeight: '700',
    color: 'black',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 19,
    //fontWeight: '500',
    color: Colors.titleColor,
    textAlign: 'left',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  text: {
    color: Colors.titleColor,
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  endText: {
    color: Colors.titleColor,
    fontSize: 16,
    textAlign: 'right',
    paddingRight: 16,
    alignSelf: 'center',
  },
});
