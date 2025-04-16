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
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, toggleTodo, deleteTodo} from '../reducer/todoReducer';
import {RootState} from '../store/store';
import app_helper from '../utils/app_helper';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

const {width: screenWidth} = Dimensions.get('window');

const imageUrls = [
  'https://img.freepik.com/free-vector/flat-design-minimal-technology-twitch-banner_23-2149153576.jpg',
  'https://www.tigren.com/blog/wp-content/uploads/2018/05/How-To-Add-Banner-Slider-In-Magento-2-Homepage-1024x569.jpg',
  'https://assets.entrepreneur.com/content/3x2/2000/1602186250-GettyImages-1150199386.jpg',
];

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true); // To control visibility of "Add Task" button
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false); // To control visibility of input section
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const progressIndex = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  let lastOffset = 0;

  const handleAddTodo = () => {
    if (!text || text.trim().length === 0) {
      app_helper.error('Error', 'Please enter a task name in input field');
      return;
    }
    dispatch(addTodo(text));
    setText('');
    setIsAddTaskVisible(false);
    setIsButtonVisible(true);
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  useAnimatedReaction(
    () => progressIndex.value,
    nextIndex => {
      runOnJS(setCurrentIndex)(Math.round(nextIndex));
    },
    [],
  );

  // Handle scroll direction to show/hide button
  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset > lastOffset && currentOffset > 100) {
      // Scrolling down
      setIsButtonVisible(false);
    } else if (currentOffset < lastOffset) {
      // Scrolling up
      setIsButtonVisible(true);
    }
    setIsAddTaskVisible(false); // Hide input section when scrolling
    lastOffset = currentOffset; // Update last offset for next comparison
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 30}}
        ListHeaderComponent={
          <>
            {/* Carousel Section */}
            <Text
              style={{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 16,
                paddingHorizontal: 16,
              }}>
              Banners{' '}
            </Text>
            <View
              accessible
              accessibilityLabel="Image carousel"
              accessibilityHint="Auto sliding image banner"
              style={{marginBottom: 16, paddingHorizontal: 16}}>
              <Carousel
                loop
                width={screenWidth - 32}
                height={200}
                autoPlay
                autoPlayInterval={3000}
                data={imageUrls}
                scrollAnimationDuration={1000}
                onProgressChange={(_, absoluteProgress) => {
                  progressIndex.value = absoluteProgress;
                }}
                renderItem={({item}) => (
                  <Image
                    source={{uri: item}}
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 12,
                    }}
                    accessibilityRole="image"
                    accessibilityLabel={`Carousel image with text: ${item
                      .split('=')
                      ?.pop()}`}
                  />
                )}
              />
              <View
                accessible
                accessibilityLabel={`Image ${currentIndex + 1} of ${
                  imageUrls.length
                }`}
                accessibilityHint="Shows the current image index in the carousel"
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 20,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 12}}
                  accessibilityRole="text"
                  accessibilityLabel={`Currently viewing image ${
                    currentIndex + 1
                  } of ${imageUrls.length}`}>
                  {currentIndex + 1} / {imageUrls.length}
                </Text>
              </View>
            </View>

            {/* Conditionally Render Input Section */}
            {isAddTaskVisible && (
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: 16,
                  elevation: 4, // Android shadow
                  shadowColor: '#000', // iOS shadow
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                }}>
                <Text
                  style={{marginBottom: 10, fontWeight: 'bold', fontSize: 16}}>
                  Your Task Name
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingLeft: 8,
                    borderRadius: 6,
                  }}
                  placeholder="Type your task here..."
                  placeholderTextColor="#888"
                  value={text}
                  onChangeText={setText}
                  accessibilityLabel="Task input field"
                  accessibilityHint="Enter a new task and press the 'Add Task' button"
                  accessible
                />
                <Button
                  title="Add Task"
                  onPress={handleAddTodo}
                  accessibilityLabel="Add Task Button"
                />
              </View>
            )}

            <View style={{marginTop: 20}} />
            <Text
              style={{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 16,
                paddingHorizontal: 16,
              }}>
              Your Tasks
            </Text>
          </>
        }
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 15,
              marginVertical: 8,
              marginHorizontal: 16,
              elevation: 3,
              shadowColor: '#000',
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
                accessibilityRole="button"
                style={{flex: 1, marginRight: 10}}>
                <Text
                  style={{
                    textDecorationLine: item.completed
                      ? 'line-through'
                      : 'none',
                    fontSize: 16,
                    color: item.completed ? 'gray' : '#333',
                    flexWrap: 'wrap',
                  }}
                  numberOfLines={0}>
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
                      {text: 'Cancel', style: 'cancel'},
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
        ListFooterComponent={<View style={{height: 20}} />}
        onScroll={handleScroll}
      />

      {/* Conditionally Render the "Add Task" Bottom Button */}
      {isButtonVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 16,
            zIndex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsAddTaskVisible(true);
              setIsButtonVisible(false);
            }} // Show input section when clicked
            style={{
              width: 60, // Size of the circular button
              height: 60, // Size of the circular button
              borderRadius: 30, // Make it circular
              backgroundColor: '#007BFF', // Set background color
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5, // Add shadow for Android
              shadowColor: '#000', // Shadow for iOS
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}
            accessible
            accessibilityLabel="Add Task Button">
            <Text
              style={{
                color: '#fff',
                fontSize: 34, // Size of the '+' icon
                fontWeight: 'bold',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
