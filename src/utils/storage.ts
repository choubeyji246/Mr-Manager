import * as SecureStore from 'expo-secure-store';

export const tokenStorage = async (token: string) => {
  try {
    await SecureStore.setItemAsync('token', token);
  } catch (error) {
    console.error('SecureStore error:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    //console.log('token', token);
    return token;
  } catch (error) {
    console.error('SecureStore error:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync('token');
  } catch (error) {
    console.error('SecureStore error:', error);
  }
};
