import {Dimensions, Platform} from 'react-native';

export class DeviceHelper {
  static dimensions = Dimensions.get('window');

  static isMiniDevice(): boolean {
    return this.dimensions.height < 700;
  }

  static width(): number {
    return this.dimensions.width;
  }

  static height(): number {
    return this.dimensions.height;
  }

  static calculateWidthRatio(size: number): number {
    const widthInDesign = 428;
    return (size * this.dimensions.width) / widthInDesign;
  }

  static calculateHeightRatio(size: number): number {
    const heightInDesign = 926;
    return (size * this.dimensions.height) / heightInDesign;
  }

  static ios(): boolean {
    return Platform.OS === 'ios';
  }

  static isIos(): boolean {
    return Platform.OS === 'ios';
  }

  static isAndroid(): boolean {
    return Platform.OS === 'android';
  }

  static device(): string {
    return this.ios() ? '2' : '1';
  }
}