import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';

type TaskProps = {
  title: string;
  onCompleteTask: () => void;
  isCompleted: boolean;
  onEditTask: (newTitle: string) => void;
  deleteTask: () => void;
  isEditing: boolean;
  editTitle: string;
  setEditTitle: (title: string) => void;
  startEditingTask: () => void;
};

const Task: React.FC<TaskProps> = (props) => {
  const handleSaveTask = () => {
    props.onEditTask(props.editTitle);
  };

  return (
    <View style={[styles.taskContainer, !props.isCompleted && styles.shadow]}>
      <View className="flex-1 flex-row gap-3 items-center">
        <TouchableOpacity onPress={props.onCompleteTask}>
          <MaterialCommunityIcons
            name={props.isCompleted ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
            size={27}
            color="#313158"
          />
        </TouchableOpacity>
        {props.isEditing ? (
          <TextInput
            value={props.editTitle}
            onChangeText={props.setEditTitle}
            onBlur={handleSaveTask}
            autoFocus
            className="flex-1 border-b border-gray-300 text-base"
          />
        ) : (
          <Text
            className={`${
              props.isCompleted ? 'line-through text-completedText' : 'text-unCompletedText'
            } font-semibold`}
          >
            {props.title}
          </Text>
        )}
      </View>
      <View className="flex flex-row gap-2">
        {!props.isEditing && !props.isCompleted && (
          <TouchableOpacity onPress={props.startEditingTask}>
            <Feather name="edit" size={24} color="#313158" />
          </TouchableOpacity>
        )}
        {
          !props.isEditing && ( <TouchableOpacity onPress={props.deleteTask}>
            <MaterialIcons name="delete" size={24} color="#313158" />
          </TouchableOpacity>)
        }
       
      </View>
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
