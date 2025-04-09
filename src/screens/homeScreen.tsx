// src/screens/HomeScreen.tsx

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, toggleTodo, deleteTodo} from '../reducer/todoReducer';
import {RootState} from '../store/store';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      {/* Input for adding task with accessibility support */}
      <Text>Your Task Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 8,
        }}
        placeholder="Type your task here..."
        placeholderTextColor="#888" // 👈 change this to any color you want
        value={text}
        onChangeText={setText}
        accessibilityLabel="Task input field"
        accessibilityHint="Enter a new task and press the 'Add Task' button"
        accessible={true}
      />

      {/* Add task button with accessibility */}
      <Button
        title="Add Task"
        onPress={handleAddTodo}
        accessibilityLabel="Add Task Button"
      />
      <View style={{marginTop: 20}} />

      {/* Todo list with accessibility for each item */}
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 15,
              marginVertical: 8,
              marginHorizontal: 16,
              elevation: 3, // For Android shadow
              shadowColor: '#000', // iOS shadow
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => handleToggleTodo(item.id)}
                accessible={true}
                accessibilityLabel={`Toggle task completion for ${item.text}`}
                accessibilityRole="button">
                <Text
                  style={{
                    textDecorationLine: item.completed
                      ? 'line-through'
                      : 'none',
                    fontSize: 16,
                    color: item.completed ? 'gray' : '#333',
                  }}
                  accessibilityLabel={
                    item.completed ? `${item.text} completed` : item.text
                  }
                  accessibilityRole="text">
                  {item.text}
                </Text>
              </TouchableOpacity>

              <Button
                title="Delete"
                color="red"
                onPress={() =>
                  Alert.alert(
                    'Delete Todo',
                    `Are you sure you want to delete "${item.text}"?`,
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => handleDeleteTodo(item.id),
                        style: 'destructive',
                      },
                    ],
                    {cancelable: true},
                  )
                }
                accessibilityLabel={`Delete task: ${item.text}`}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
