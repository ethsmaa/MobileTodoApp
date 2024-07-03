import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

type TaskProps = {
  title: string;
  onCompleteTask: () => void; 
  isCompleted: boolean;
  onEditTask: (newTite: string) => void;
};

const Task = (props: TaskProps) => {

  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editTitle, setEditTitle] = React.useState<string>(props.title);

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleSaveTask = () => {
    props.onEditTask(editTitle);
    setIsEditing(false);
  };


  return (
    // if iscolpeted is false show shadow
    <View style={[styles.taskContainer, !props.isCompleted && styles.shadow]}>
      <View className="flex-1 flex-row  gap-3 items-center ">  
        <TouchableOpacity onPress={props.onCompleteTask}>
          <MaterialCommunityIcons 
            name={props.isCompleted ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'} 
            size={27} 
            color='#313158'
          />
        </TouchableOpacity>
      {
        isEditing?  (
          <TextInput
            value={editTitle}
            onChangeText={setEditTitle}
            onBlur={handleSaveTask}
            autoFocus
            className='flex-1 border-b border-gray-300 text-base'

          />
        ) : (
          <Text className={`${props.isCompleted ? 'line-through text-completedText' : 'text-unCompletedText'} font-semibold`}>{props.title}</Text>

        )
      
      }
        </View>
        {!isEditing &&!props.isCompleted && 
          <TouchableOpacity onPress={handleEditTask}>
            <Feather name="edit" size={24} color='#313158' />
          </TouchableOpacity>
        }

    
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    margin: 4,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
