import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';

type BottomSheetProps = {
  snapPoints: (string)[];
  todoName: string;
  setTodoName: (name: string) => void;
  handleAddTask: () => void;
};

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  snapPoints,
  todoName,
  setTodoName,
  handleAddTask
}) => {
  const [task, setTask] = useState(todoName);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  useEffect(() => {
    setTodoName(task);
  }, [task]);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleSnapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index);

  const handleAddPress = () => {
    handleAddTask();
    setTask('');
    handleClosePress();
  }

  const handleSubmitEditing = () => {
    handleAddPress();
  }

  const renderBackdrop = useCallback(() => (
  (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
  ), []);

  return (
    <>
      <TouchableOpacity
        onPress={() => handleSnapeToIndex(2)}
        className="w-16 h-16 bg-primaryHeadline rounded-full flex justify-center items-center absolute bottom-4 right-4"
      >
        <Text className="text-4xl font-normal text-buttonText">+</Text>
      </TouchableOpacity>

      <BottomSheet
      enablePanDownToClose={true}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop()}
      >
        <View className='p-4 flex h-full'>
          <Text className='text-center font-extrabold text-lg border-b border-gray-200 w-5/6 self-center pb-3'>Add new todo</Text>
          <Text className='pt-4 pb-2 font-bold text-base'>Task name</Text>
          <BottomSheetTextInput
            value={task}
            onChangeText={setTask}
            placeholder="Enter task"
            style={{ padding: 10, backgroundColor: '#EBF1F5', borderRadius: 5 }}
            onSubmitEditing={handleSubmitEditing}
            
          />
          <Text className='pt-4 pb-2 font-bold text-base'>Category</Text>
          <Text className='pt-4 pb-2 font-bold text-base'>Due time</Text>
          <TouchableOpacity onPress={handleAddPress} className='bg-primaryHeadline p-3 mt-4 items-center rounded-full w-5/6 self-center '>
            <Text className='text-base text-white' >Add Task</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetComponent;
