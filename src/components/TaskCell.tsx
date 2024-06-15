import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { DeviceHelper } from "../utils/helper";
import { Colors } from "../constants/colors";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/AntDesign";
import { Task } from "../screens/TaskComponent";
import getResponse from "../utils/httpResponse";
import { endpoints } from "../constants/endPoint";

interface TaskCellProps {
  item: Task;
  enable: string;
  handleSetEnable: (itemValue: string) => void;
  handleNavigate: (task: Task) => void;
}

const dropDownData = [
  { label: "Todo", value: "Todo" },
  { label: "Development", value: "In development" },
  { label: "Testing", value: "Testing" },
  { label: "Production", value: "Production" },
];

const TaskCell: React.FC<TaskCellProps> = ({
  item,
  enable,
  handleSetEnable,
  handleNavigate,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStatusUpdate = async (itemValue: string, _id: string) => {
   // console.log(_id, itemValue);
    try {
      const response = await getResponse(
        "patch",
        endpoints.updateStatus + `?taskId=${_id}`,
        { status: itemValue }
      );
     // console.log(JSON.stringify(response, null, 4));
      handleSetEnable(itemValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Pressable
        style={styles.taskContainer}
        onPress={() => handleNavigate(item)}
      >
        <Text style={styles.taskTitle}>{item.name}</Text>
        <Icon
          style={styles.icon}
          name={"bars"}
          color={"black"}
          size={25}
          onPress={() => setShowDropdown(!showDropdown)}
        />
      </Pressable>

      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={enable}
            style={styles.dropdownPicker}
            onValueChange={(itemValue) =>
              handleStatusUpdate(itemValue, item._id)
            }
          >
            {dropDownData.map((data) => (
              <Picker.Item
                label={data.label}
                value={data.value}
                key={data.value}
              />
            ))}
          </Picker>
        </View>
      )}
    </>
  );
};

export default TaskCell;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#cfcccc",
    height: DeviceHelper.calculateHeightRatio(50),
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  taskTitle: {
    flex: 1,
    textAlign: "center",
    color: Colors.titleColor,
  },
  icon: {
    alignSelf: "flex-end",
  },
  dropdownContainer: {
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  dropdownPicker: {
    width: "100%",
    ...Platform.select({
      android: {
        height: 50,
      },
      ios: {
        height: 200, 
      },
    }),
  },
});


