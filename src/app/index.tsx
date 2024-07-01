import React from 'react';
import { View, Text, Image, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './../components/task'; // Import the Task component

const App = () => {
  const [task, setTask] = React.useState<string>("");
  const [taskItems, setTaskItems] = React.useState<string[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([task, ...taskItems]);
    setTask('');
  };

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View className="flex-1 bg-slate-200">
      <View className="flex flex-row py-2 px-3 bg-slate-400 rounded-l border-slate-950 border-b-2">
        <Image
          source={require('./../../assets/icons/to-do-list.png')}
          style={{ width: 50, height: 50 }}
        />
        <Text className="text-4xl py-3 px-5 font-bold text-slate-950">
          ToDo<Text className="text-iconColorYellow">'</Text>s
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
        {taskItems.map((item, index) => (
          <Task key={index} title={item} onCompleteTask={() => completeTask(index)} />
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="absolute bottom-3 w-full flex flex-row flex-wrap justify-around items-center"
      >
        <TextInput
          placeholder="Add a new to-do"
          className="w-5/6 h-12 bg-slate-100 rounded-l p-4 text-md text-slate-900 border-slate-300 rounded-3xl border-2"
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View className="w-12 h-12 bg-white rounded-full border-slate-300 border-2 flex justify-center items-center">
            <Text className="text-4xl font-extralight text-slate-900">+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default App;
