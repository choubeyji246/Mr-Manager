import React from "react";
import { View } from "react-native";
import { FieldValues, useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import { FormField } from "../screens/Login";

interface TaskFormProps {
  onSubmit: (data: FieldValues) => void;
  inputs: Array<FormField>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, inputs }) => {
  const { control, handleSubmit } = useForm<FieldValues>();

  return (
    <View>
      {inputs.map((field) => (
        <CustomTextInput
          key={field.key}
          placeholder={field.placeholder}
          name={field.name}
          icon={field.icon}
          control={control}
          rules={field.rules}
        />
      ))}
      <CustomButton onPress={handleSubmit(onSubmit)}>Submit</CustomButton>
    </View>
  );
};

export default TaskForm;
