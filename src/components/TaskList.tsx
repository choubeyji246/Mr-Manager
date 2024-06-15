import React from "react";
import { FlatList } from "react-native";
import DataSection from "../components/DataSection";

export interface Task {
  _id: string;
  projectId: string;
  name: string;
  description: string;
  assignedTo: {};
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Array<Task>;
  enable: string;
  handleSetEnable: (itemValue: string) => void;
  projectId: string;
}

const taskScreenData = [
  { title: "Todo", status: "Todo" },
  { title: "Development", status: "In development" },
  { title: "Testing", status: "Testing" },
  { title: "Production", status: "Production" },
];

const TaskList: React.FC<TaskListProps> = ({ tasks, enable, handleSetEnable, projectId }) => {
  const renderTaskData = ({ item }: { item: any }) => (
    <DataSection
      enable={enable}
      handleSetEnable={handleSetEnable}
      taskArray={tasks}
      projectId={projectId}
      taskData={item}
    />
  );

  return (
    <FlatList
      data={taskScreenData}
      keyExtractor={(item) => item.title}
      renderItem={renderTaskData}
    />
  );
};

export default TaskList;
