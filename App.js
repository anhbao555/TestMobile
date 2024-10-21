import React from 'react'
// You can import supported modules from npm
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
// or any files within the Snack
import AssetExample from './components/AssetExample';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import AddJobScreen from './AddJobScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AddJob" component={AddJobScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
