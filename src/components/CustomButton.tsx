import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { DeviceHelper } from '../utils/helper';
import { Colors } from '../constants/colors';



interface CustomButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onPress,
  style,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonContainer,
        pressed ? styles.buttonPressed : null,
        style,
        disabled ? {backgroundColor: 'grey'} : null,
      ]}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: Colors.titleColor,
    height: DeviceHelper.calculateWidthRatio(58),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: Colors.hover,
  },
  buttonText: {
    color: Colors.whiteBackGround,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
