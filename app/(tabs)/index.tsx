import 'react-native-gesture-handler';
import useFonts from "@/hooks/useFonts";
import Navigation from "@/src/components/Navigation";
import { store } from "@/src/store/store";
import { SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ActivityIndicator, View, StyleSheet,Text, Button, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Index: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  


  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        //SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <Navigation />

    </Provider>
    </GestureHandlerRootView>
  );
};

export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

});