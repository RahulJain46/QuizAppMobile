import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import KBCInstructionScreen from '../screens/KBCInstructionScreen';
import KBCResultScreen from '../screens/KBCResultScreen';
import KBCLoginScreen from '../screens/KBCLoginScreen';
import KBCGameScreen from '../screens/KBCGameScreen';
import QuizLoginScreen from '../screens/QuizLoginScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import DailyQuizFormScreen from '../screens/DailyQuizFormScreen';
import BooksScreen from '../screens/BooksScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app navigation
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{
          tabBarLabel: 'Quiz',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="KBCInstruction" component={KBCInstructionScreen} />
        <Stack.Screen name="KBCResult" component={KBCResultScreen} />
        <Stack.Screen name="KBCLogin" component={KBCLoginScreen} />
        <Stack.Screen name="KBCGame" component={KBCGameScreen} />
        <Stack.Screen name="QuizLogin" component={QuizLoginScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        <Stack.Screen name="DailyQuiz" component={QuizScreen} />
        <Stack.Screen name="DailyQuizForm" component={DailyQuizFormScreen} />
        <Stack.Screen name="Books" component={BooksScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
