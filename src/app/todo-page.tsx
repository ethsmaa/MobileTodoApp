import React from 'react';
import {
  View, KeyboardAvoidingView, Platform, Text, FlatList, ListRenderItem, Alert
} from 'react-native';
import Task from '../components/task';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomSheetComponent from '../components/BottomSheet';

type TaskItem = {
  title: string;
  isCompleted: boolean;
};

const App: React.FC = () => {
  const [task, setTask] = React.useState<string>("");
  const [taskItems, setTaskItems] = React.useState<TaskItem[]>([]);
  const [completedItems, setCompletedItems] = React.useState<TaskItem[]>([]);
  const [editingTaskIndex, setEditingTaskIndex] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState<string>("");

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      return;
    }
    const newTask: TaskItem = { title: task, isCompleted: false };
    setTaskItems([newTask, ...taskItems]);
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
      uncompletedItem.isCompleted = false;
      setCompletedItems(completedCopy);
      setTaskItems([uncompletedItem, ...taskItems]);
    } else {
      let itemsCopy = [...taskItems];
      let completedItem = itemsCopy.splice(index, 1)[0];
      completedItem.isCompleted = true;
      setTaskItems(itemsCopy);
      setCompletedItems([completedItem, ...completedItems]);
    }
  };

  const editTask = (index: number, newTitle: string) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].title = newTitle;
    setTaskItems(itemsCopy);
    setEditingTaskIndex(null);
    setEditTitle("");
  };

  const startEditingTask = (index: number) => {
    setEditingTaskIndex(index);
    setEditTitle(taskItems[index].title);
  };



  const renderTask: ListRenderItem<TaskItem> = ({ item, index }) => (
    <Task
      key={index}
      title={item.title}
      onCompleteTask={() => completeTask(index, false)}
      isCompleted={item.isCompleted}
      onEditTask={(newTitle) => editTask(index, newTitle)}
      deleteTask={() => confirmDeleteTask(index, false)}
      isEditing={editingTaskIndex === index}
      editTitle={editTitle}
      setEditTitle={setEditTitle}
      startEditingTask={() => startEditingTask(index)}
  
    />
  );

  const renderCompletedTask: ListRenderItem<TaskItem> = ({ item, index }) => (
    <Task
      key={index}
      title={item.title}
      onCompleteTask={() => completeTask(index, true)}
      isCompleted={item.isCompleted}
      onEditTask={() => { }}
      deleteTask={() => confirmDeleteTask(index, true)}
      isEditing={false}
      editTitle={item.title}
      setEditTitle={() => { }}
      startEditingTask={() => { }}
     
    />
  );

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-bridalWhite"
      >
        <View className="w-full flex flex-row items-center justify-center bg-white">
          <Text className='text-4xl font-extrabold text-primaryHeadline p-3'> todo </Text>
        </View>

        <View className="border-b border-mistGray mt-1 w-5/6 self-center" />

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
        <BottomSheetComponent
          snapPoints={['25%', '50%', '70%', '90%']}
          todoName={task}
          setTodoName={setTask}
          handleAddTask={handleAddTask}
        />
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default App;
