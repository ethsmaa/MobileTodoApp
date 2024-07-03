import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, FlatList, ListRenderItem, Alert, Image } from 'react-native';
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
    itemsCopy.splice(index, 1);
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
      onEditTask={() => { }}
      deleteTask={() => confirmDeleteTask(index, true)}
      isEditing={false}
      editTitle={item}
      setEditTitle={() => { }}
      startEditingTask={() => { }}
    />
  );

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
    </View>
  );
};

export default App;
