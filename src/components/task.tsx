import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Divider, Menu } from 'react-native-paper';
import MenuItem from '../components/MenuItem';

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
  const [visible, setVisible] = useState(false);


 

  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  const handleSaveTask = () => {
    props.onEditTask(props.editTitle);
  };

  return (
    <View style={[styles.taskContainer, !props.isCompleted && styles.shadow]}>
      <View className="flex flex-1">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={props.onCompleteTask}>
              <MaterialCommunityIcons
                name={props.isCompleted ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                size={27}
                color="#62626c"
              />
            </TouchableOpacity>
            {props.isEditing ? (
              <TextInput
                value={props.editTitle}
                onChangeText={props.setEditTitle}
                onBlur={handleSaveTask}
                autoFocus
                className="text-base text-slate-900"
              />
            ) : (
              <Text style={[styles.text, props.isCompleted && styles.completedText]}>{props.title}</Text>
            )}
          </View>

          {!props.isEditing && (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                  <MaterialIcons name="more-vert" size={24} color="#62626c" />
                </TouchableOpacity>
              }
              contentStyle={styles.menu}
            >
              

              <MenuItem title="Edit" onPress={props.startEditingTask} iconName="edit" />
              <MenuItem title="Delete" onPress={props.deleteTask} iconName="trash" />
            </Menu>
          )}

        </View>

        
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
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  menuButton: {
    padding: 2,
  },
  menu: {
    backgroundColor: '#898baa',
    borderRadius: 10,
  },
});
