import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
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
        <View
          style={[styles.checkbox, task.completed && styles.checkedCheckbox]}
        >
          {task.completed && <Text style={styles.checkboxText}>✓</Text>}
        </View>
      </TouchableOpacity>

      {isEditing ? (
        <>
          <TextInput
            style={[styles.input, task.completed && styles.completedTask]}
            value={editedTask}
            onChangeText={setEditedTask}
          />
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={[styles.taskText, task.completed && styles.completedTask]}
          >
            {task.description}
          </Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Image source={editIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete}>
            <Image source={deleteIcon} style={styles.icon} />
          </TouchableOpacity>
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
    paddingRight: 20,
    paddingLeft: 20,
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
    borderColor: '#98A2B3',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
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
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    opacity: 0.5,
  },
  saveText: {
    color: '#F04438',
    marginLeft: 10,
  },
});

export default TaskItem;
