import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type TaskProps = {
  title: string;
  onCompleteTask: () => void;
};

const Task = (props: TaskProps) => {
  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity onPress={props.onCompleteTask}>
        <View className="w-12 h-12 bg-slate-100 rounded-full border-slate-500 border flex justify-center items-center">
          <Text className="text-2xl font-extralight text-slate-500">✓</Text>
        </View>
      </TouchableOpacity>
      <View className="flex-1 m-2 p-3 rounded-l bg-slate-100 border-slate-500 border text-blue-950">
        <Text>{props.title}</Text>
      </View>
    </View>
  );
};

export default Task;
