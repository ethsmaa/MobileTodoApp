import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './../components/task'; 

const App = () => {
  const [task, setTask] = React.useState<string>("");
  const [taskItems, setTaskItems] = React.useState<string[]>([]);
  const [completedItems, setCompletedItems] = React.useState<string[]>([]);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      return; // Boş görev eklemeyi önler
    }
    Keyboard.dismiss();
    setTaskItems([task, ...taskItems]);
    setTask('');
  };

  const completeTask = (index: number, isCompleted: boolean) => {
    if (isCompleted) {
      let completedCopy = [...completedItems];
      let uncompletedItem = completedCopy.splice(index, 1)[0];
      setCompletedItems(completedCopy);
      setTaskItems([uncompletedItem, ...taskItems]);
    } else {
      let itemsCopy = [...taskItems];
      let completedItem = itemsCopy.splice(index, 1)[0];
      setTaskItems(itemsCopy);
      setCompletedItems([completedItem, ...completedItems]);
    }
  };

  const editTask = (index: number, newTitle: string) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = newTitle;
    setTaskItems(itemsCopy);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-bridalWhite"
    >
      <View className="w-full flex flex-row items-center justify-center bg-white">
        <View className="flex flex-row mt-4 items-center w-5/6 bg-mistGray rounded-full p-2">
          <TextInput
            placeholder="Add a new to-do"
            className="flex-1 px-3 text-base text-slate-900"
            value={task}
            onChangeText={(text) => setTask(text)}
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity
            onPress={handleAddTask}
            disabled={task.trim().length === 0}
            className={`w-10 h-10 rounded-full flex justify-center items-center ${task.trim().length === 0 ? 'bg-disabledButtonBg' : 'bg-buttonBg'}`}
          >
            <Text className={`text-3xl font-normal ${task.trim().length === 0 ? 'text-bridalWhite' : 'text-buttonText'}`}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b border-mistGray mt-3" />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
        <Text className="text-lg font-bold mb-2 text-titleColor">To Do</Text>
        {taskItems.length === 0 ? (
          <Text className="text-center text-gray-500 mt-8">No tasks added yet</Text>
        ) : (
          taskItems.map((item, index) => (
            <Task
              key={index}
              title={item}
              onCompleteTask={() => completeTask(index, false)}
              isCompleted={false}
              onEditTask={(newTitle) => editTask(index, newTitle)}
            />
          ))
        )}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
        <Text className="text-lg font-bold mb-2 text-titleColor">Completed</Text>
        {completedItems.map((item, index) => (
          <Task
            key={index}
            title={item}
            onCompleteTask={() => completeTask(index, true)}
            isCompleted={true}
            onEditTask={() => {}}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default App;
