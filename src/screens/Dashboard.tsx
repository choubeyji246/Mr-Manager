import React, { useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { DeviceHelper } from '../utils/helper';
import CustomTextInput from '../components/CustomTextInput';
import Icon from 'react-native-vector-icons/AntDesign';
import { getToken, removeToken } from '../utils/storage';
import {jwtDecode} from 'jwt-decode';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import getResponse from '../utils/httpResponse';
import { endpoints } from '../constants/endPoint';
import { AxiosResponse } from 'axios';
import Card from '../components/Card';
import { Fonts } from '../constants/fonts';
import { Colors } from '../constants/colors';
import { FieldValues, useForm } from 'react-hook-form';
//import MapView from 'react-native-maps';

export interface Projects {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  members: [];
  tasks: [];
}

interface DecodedToken {
  userId: string;
  email: string;
}

const Dashboard = () => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  //const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchAndDecodeToken = async () => {
      try {
        const token: string | null = await getToken();
        if (token) {
          const decoded: DecodedToken = jwtDecode(token);
          setDecodedToken(decoded);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchAndDecodeToken();
  }, []);

  const route = useRoute();

  const fetchProjects = async () => {
    try {
      const response: AxiosResponse = await getResponse('get', endpoints.getAllProjects);
      setProjects(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (word: string) => {
    setSearchString(word);
  };

  const navigation = useNavigation<NavigationProp<any>>();
  const handleLogout = async () => {
    await removeToken();
    navigation.navigate('Login');
  };

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchString.toLowerCase())
  );

  const renderProjectItem: ListRenderItem<Projects> = ({ item }) => (
    <Card project={item} />
  );

  return (
    <View style={styles.root}>
      <View style={styles.profile}>
        <View style={styles.leftProfile}>
          <Image
            style={styles.image}
            source={require('../assets/images/profile.png')}
          />
          <Text style={styles.text}>{decodedToken?.email}</Text>
        </View>
        <View>
          <Icon name="logout" size={25} onPress={handleLogout} />
        </View>
      </View>
      <CustomTextInput
        icon="search1"
        placeholder="Search Projects"
        name="search"
        control={control}
        onChangeText={handleSearch}
      />
      
      <FlatList
      nestedScrollEnabled={true}
        data={filteredProjects}
        keyExtractor={(item) => item._id}
        renderItem={renderProjectItem}
      />
       
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.titleColor,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  leftProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    height: DeviceHelper.calculateWidthRatio(78),
    width: DeviceHelper.calculateHeightRatio(83),
  },
  text: {
    fontFamily: Fonts.semiBold,
    color: Colors.titleColor,
  },
  map:{
     width: '100%',
    height: '100%'
  }
});
