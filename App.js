import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import JobScreen from './apps/src/screens/JobsList';
 import HomeScreen from './apps/src/screens/Home';
 import JobDetailsScreen from './apps/src/screens/JobDetails';
 import SavedJobsScreen from './apps/src/screens/SavedJobs';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
        name='JobsList' 
        component={JobScreen}
        options={{ title: 'Job List' }}/>
        <Stack.Screen
        name='JobDetail'
        component={JobDetailsScreen}
        options = {{title: "Job Details"}}
        />
        <Stack.Screen
        name='SavedJobs'
        component={SavedJobsScreen}
        options={{title: "Saved Jobs"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack
