import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import TabViewCell from './TabViewCell';
import CreateProject from '../screens/CreateProject';
import Dashboard from '../screens/Dashboard';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {



  const tabNavigatorOptions = [
    {
      name: 'Dashboard',
      component: Dashboard,
      icon: require('../assets/images/home.png'),
      label: 'Home',
    },
    {
      name: 'createProject',
      component: CreateProject,
      icon: require('../assets/images/add-folder.png'),
      label: 'Add Project',
    },
   
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#e9e2da',
          height:65
        },
      }}
    >
      {tabNavigatorOptions.map((option) => (
        <Tab.Screen
          key={option.name}
          name={option.name}
          component={option.component}
          options={{
            headerShown: false,
            tabBarShowLabel:false,
            tabBarIcon: ({ focused }) => (
              <TabViewCell focused={focused} source={option.icon} label={option.label} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
