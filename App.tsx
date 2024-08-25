import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

const TASKS_STORAGE_KEY = '@tasks_storage_key'; // Key used to store tasks in AsyncStorage

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  const [error, setError] = useState<string | null>(null);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks state changes
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      setError('Failed to load tasks. Please try again later.');
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      setError('Failed to save tasks. Please try again later.');
      console.error('Failed to save tasks:', error);
    }
  };

  const handleAddTask = (description: string) => {
    if (description.length > 100) {
      Alert.alert('Error', 'Task description is too long. Please keep it under 100 characters.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      description,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (id: string, newDescription: string) => {
    if (newDescription.length > 100) {
      Alert.alert('Error', 'Task description is too long. Please keep it under 100 characters.');
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError('Failed to delete the task. Please try again later.');
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleComplete = (id: string) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      setError('Failed to update the task status. Please try again later.');
      console.error('Failed to toggle task completion:', error);
    }
  };

  // Sort tasks based on the selected criteria (date and status)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'date') {
      return b.createdAt - a.createdAt;
    } else {
      return Number(a.completed) - Number(b.completed);
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.sortButtons}>
        <Button
          title="Sort by Date"
          onPress={() => setSortBy('date')}
          color={sortBy === 'date' ? '#F04438' : '#ccc'}
        />
        <Button
          title="Sort by Status"
          onPress={() => setSortBy('status')}
          color={sortBy === 'status' ? '#F04438' : '#ccc'}
        />
      </View>
      <TaskInput onAddTask={handleAddTask} />
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFA',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#F04438',
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
