import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import deleteIcon from '../assets/delete-icon.png';
import editIcon from '../assets/edit-icon.png';


const TaskItem = ({ task, onEditTask, onDeleteTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.description);

  const handleSave = () => {
    onEditTask(task.id, editedTask);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDeleteTask(task.id),
      },
    ]);
  };

  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
        <View style={[styles.checkbox, task.completed && styles.checkedCheckbox]}>
          {task.completed && <Text style={styles.checkboxText}>✓</Text>}
        </View>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={[styles.input, task.completed && styles.completedTask]}
          value={editedTask}
          onChangeText={setEditedTask}
        />
      ) : (
        <Text style={[styles.taskText, task.completed && styles.completedTask]}>
          {task.description}
        </Text>
      )}

      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <>
          <Button title="Edit" onPress={() => setIsEditing(true)} />
          <Button title="Delete" onPress={confirmDelete} color="red" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  input: {
    flex: 1,
    borderColor: '#F04438',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color: '#F04438',  
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1, 
    borderColor: '#F04438',
    borderRadius: 6, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#F04438',
  },
  checkboxText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default TaskItem;
