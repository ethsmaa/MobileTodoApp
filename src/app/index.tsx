import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, FlatList, ListRenderItem, Alert } from 'react-native';
import Task from './../components/task';

const App = () => {
  const [task, setTask] = React.useState<string>("");
  const [taskItems, setTaskItems] = React.useState<string[]>([]);
  const [completedItems, setCompletedItems] = React.useState<string[]>([]);
  const [editingTaskIndex, setEditingTaskIndex] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState<string>("");

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      return;
    }
    Keyboard.dismiss();
    setTaskItems([task, ...taskItems]);
    setTask('');
  };

  const confirmDeleteTask = (index: number, isCompleted: boolean) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => handleDeleteTask(index, isCompleted),
          style: "destructive",
        },
      ]
    );
  };
  
  const handleDeleteTask = (index: number, isCompleted: boolean) => {
    let items = isCompleted ? completedItems : taskItems;
    let setItems = isCompleted ? setCompletedItems : setTaskItems;
    let copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
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
    setEditingTaskIndex(null);
    setEditTitle("");
  };

  const startEditingTask = (index: number) => {
    setEditingTaskIndex(index);
    setEditTitle(taskItems[index]);
  };

  const renderTask: ListRenderItem<string> = ({ item, index }) => (
    <Task
      key={index}
      title={item}
      onCompleteTask={() => completeTask(index, false)}
      isCompleted={false}
      onEditTask={(newTitle) => editTask(index, newTitle)}
      deleteTask={() => confirmDeleteTask(index, false)}
      isEditing={editingTaskIndex === index}
      editTitle={editTitle}
      setEditTitle={setEditTitle}
      startEditingTask={() => startEditingTask(index)}
    />
  );

  const renderCompletedTask: ListRenderItem<string> = ({ item, index }) => (
    <Task
      key={index}
      title={item}
      onCompleteTask={() => completeTask(index, true)}
      isCompleted={true}
      onEditTask={() => {}}
      deleteTask={() => confirmDeleteTask(index, true)}
      isEditing={false}
      editTitle={item}
      setEditTitle={() => {}}
      startEditingTask={() => {}}
    />
  );

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

      {
        // section list mi kullansam flatlist mi karar veremedim
      }
      <FlatList
        data={taskItems}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text className="text-center text-gray-500 mt-8">No tasks added yet</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="p-4"
        ListHeaderComponent={<Text className="text-lg font-bold mb-2 text-titleColor">To Do</Text>}
      />

      <FlatList
        data={completedItems}
        renderItem={renderCompletedTask}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="p-4"
        ListHeaderComponent={<Text className="text-lg font-bold mb-2 text-titleColor">Completed</Text>}
      />
    </KeyboardAvoidingView>
  );
};

export default App;
