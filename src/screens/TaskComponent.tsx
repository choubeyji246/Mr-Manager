import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { RouteProp, useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import ModalView from "../components/ModalView";
import { fetchTasks } from "../store/fetchTasksSlice";
import { AppDispatch } from "../store/store";
import getResponse from "../utils/httpResponse";
import { endpoints } from "../constants/endPoint";
import { addTask } from "../store/addTaskSlice";
import { useModal } from "../hooks/useModal";
import TaskList, { Task } from "../components/TaskList";
import MemberList from "../components/MemberList";
import TaskForm from "../components/TaskForm";
import { FormField } from "./Login";
import { DeviceHelper } from "../utils/helper";
import { FieldValues } from "react-hook-form";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const roles = ["Tester", "Developer"];

type memberDataItem = {
  email: string;
  role?: string;
};

type RouteParams = {
  params: {
    members: Array<memberDataItem>;
    projectId: string;
  };
};

const TaskComponent: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const dispatch = useDispatch<AppDispatch>();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [members, setMembers] = useState<Array<memberDataItem>>(
    route.params.members
  );
  const [enable, setEnable] = useState("");
  const projectId = route.params.projectId;

  const memberModal = useModal();
  const infoModal = useModal();
  const taskModal = useModal();

  useEffect(() => {
    const fetchTasksHandler = async () => {
      const response = await dispatch(fetchTasks(projectId));
      if (response) {
        const responseData = response.data.data.data;
        setTasks(responseData);
      }
    };
    fetchTasksHandler();
  }, [dispatch, projectId, enable, members]);

  const handleAddMember = async (data: FieldValues) => {
    try {
      await getResponse("post", endpoints.addMember, {
        email: data.email,
        role: data.role,
        projectId: projectId,
      });
      setMembers((prevVal) => [
        ...prevVal,
        { email: data.email, role: data.role },
      ]);
      memberModal.closeModal();
      Alert.alert("Success✅", "Member added successfully", [
        { text: "close" },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Failed!", "Something went wrong, Try again", [
        { text: "close" },
      ]);
    }
  };

  const handleAddTask = async (data: FieldValues) => {
    try {
      const formData = {
        name: data.name,
        description: data.description,
        assignedTo: { email: data.email, role: data.role },
        projectId: projectId,
      };
      const response = await dispatch(addTask(formData));
      setTasks((prevVal) => [...prevVal, response?.data.data.data]);
      taskModal.closeModal();
      Alert.alert("Success✅", "Task added successfully", [{ text: "close" }]);
    } catch (error) {
      Alert.alert("Failed!", "Something went wrong, Try again", [
        { text: "close" },
      ]);
      console.log(error);
    }
  };

  const addMemberInputs: Array<FormField> = [
    {
      key: "email",
      name: "email",
      icon: "mail",
      placeholder: "Email Address",
      isSecure: false,
      rules: {
        required: "Email is required",
        pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
      },
    },
    {
      key: "role",
      name: "role",
      icon: "user",
      placeholder: "Role",
      isSecure: false,
      rules: {
        required: "Role is required",
        validate: (value: string) => roles.includes(value) || "Role is invalid",
      },
    },
  ];

  const createTaskInputs: Array<FormField> = [
    {
      key: "name",
      name: "name",
      icon: "tago",
      placeholder: "Enter task name",
      isSecure: false,
      rules: {
        required: "Task name is required",
      },
    },
    {
      key: "description",
      name: "description",
      icon: "infocirlceo",
      placeholder: "Enter the task description",
      isSecure: false,
      rules: {
        required: "Description is required",
      },
    },
    {
      key: "email",
      name: "email",
      icon: "mail",
      placeholder: "Enter email of the person to be assigned",
      isSecure: false,
      rules: {
        required: "email is required",
        pattern: { value: EMAIL_REGEX, message: "Invalid email" },
      },
    },
    {
      key: "role",
      name: "role",
      icon: "infocirlceo",
      placeholder: "Enter the role (Tester or Developer)",
      isSecure: false,
      rules: {
        required: "Role is required",
        validate: (value: string) => roles.includes(value) || "Role is invalid",
      },
    },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.image}>
        <Image source={require("../assets/images/taskImage.png")} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Icon
          name="infocirlceo"
          size={25}
          color="black"
          onPress={infoModal.openModal}
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          onPress={memberModal.openModal}
          style={{ paddingHorizontal: 20 }}
        >
          <Icon name="addfolder" size={25} color={"white"} />
          Add Member
        </CustomButton>
        <CustomButton
          onPress={taskModal.openModal}
          style={{ paddingHorizontal: 20 }}
        >
          <Icon name="addfolder" size={25} color={"white"} />
          Create Task
        </CustomButton>
      </View>

      <TaskList
        tasks={tasks}
        enable={enable}
        handleSetEnable={setEnable}
        projectId={projectId}
      />

      <ModalView
        modalVisible={memberModal.isVisible}
        closeModal={memberModal.closeModal}
      >
        <TaskForm onSubmit={handleAddMember} inputs={addMemberInputs} />
      </ModalView>

      <ModalView
        modalVisible={taskModal.isVisible}
        closeModal={taskModal.closeModal}
      >
        <TaskForm onSubmit={handleAddTask} inputs={createTaskInputs} />
      </ModalView>

      <ModalView
        modalVisible={infoModal.isVisible}
        closeModal={infoModal.closeModal}
      >
        <View>
          <Text style={styles.modalTitle}>Members</Text>
          <MemberList members={members} />
        </View>
      </ModalView>
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    alignItems: "center",
    height: DeviceHelper.calculateWidthRatio(200),
  },
  members: {
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
