import React from "react";
import {   StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView} from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { Task } from "../screens/TaskComponent";
import TaskCell from "./TaskCell";
import { Fonts } from "../constants/fonts";

interface DataSectionProps {
  taskData: {
    title: string;
    status: string;
  };
  projectId: string;
  taskArray: Array<Task>;
  handleSetEnable: (itemValue: string) => void;
  enable: string;
}

const DataSection: React.FC<DataSectionProps> = ({
  enable,
  taskArray,
  projectId,
  taskData,
  handleSetEnable,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleNavigate = (task: Task) => {
    navigation.navigate("TaskDetails", { task });
  };

  const renderTaskItems = ({ item}:{item:Task}) => {
    //console.log(item);
    
    if (item.status === taskData.status) {
      return (
        <TaskCell
          item={item}
          enable={enable}
          handleSetEnable={handleSetEnable}
          handleNavigate={handleNavigate}
        />
      );
    }
    return null;
  };

  return (
    <ScrollView >
    <View style={styles.container}>
      <Text style={styles.title}>{taskData.title}</Text>
      <FlatList
        data={taskArray}
        keyExtractor={(item) => item._id}
        renderItem={renderTaskItems}
        contentContainerStyle={styles.listContainer}
      />
    </View>
    </ScrollView>
  );
};

export default DataSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
