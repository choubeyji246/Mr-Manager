import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Fonts } from "../constants/fonts";
import { CameraView, useCameraPermissions } from "expo-camera";
import { DeviceHelper } from "../utils/helper";
import { Colors } from "../constants/colors";
import CustomButton from "../components/CustomButton";
import * as Location from 'expo-location';
import MapView from "react-native-maps"

type Location = {
    Latitude: string;
    Longitude: string;
  };
const TaskDetails: React.FC = () => {
  const route = useRoute();
  const { task } = route.params;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>({ Latitude: '', Longitude: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const cameraRef = useRef<any | null>(null);
  //console.log(task);


//   useEffect(() => {

//     const getLocationPermissionandFetchLocation = 
    
//     getLocationPermissionandFetchLocation()
//   }, []);


  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  if (!permission.granted) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log(photo);
    }
  };

  const getLocation =async()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const {latitude, longitude}= location.coords
      console.log(latitude,longitude);
      
      setLocation((prevVal)=> ({...prevVal, Latitude:latitude.toLocaleString(), Longitude:longitude.toLocaleString()}))
}
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>{task.name}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.status}>Status: {task.status}</Text>
      <Text style={styles.assignedTo}>
        Assigned To: {task.assignedTo.email} as a {task.assignedTo.role}
      </Text>
      <Text style={styles.timestamps}>Created At: {task.createdAt}</Text>
      <Text style={styles.timestamps}>Updated At: {task.updatedAt}</Text>

      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <CustomButton onPress={takePicture}>Take Picture</CustomButton>
      <CustomButton onPress={getLocation}>Get location</CustomButton>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
    </View>
    <Text>{`Latitude:${location.Latitude}`}</Text>
    <Text>{`Longitude:${location.Longitude}`}</Text>
    <MapView style={styles.map} />
    </ScrollView>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    height: 200,
    elevation: 2,
    backgroundColor: Colors.whiteBackGround,
    overflow: "hidden",
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  status: {
    fontSize: 16,
    marginVertical: 10,
  },
  assignedTo: {
    fontSize: 16,
    marginVertical: 10,
  },
  timestamps: {
    fontSize: 14,
    marginVertical: 5,
    color: "#888",
  },

  camera: {
    // flex: 1,
    height: DeviceHelper.calculateHeightRatio(250),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  preview: {
    marginTop: 20,
    width: "100%",
    height: DeviceHelper.calculateHeightRatio(250),
  },
  map:{
    marginHorizontal:20,
    width:350,
    height:300
  }
});
