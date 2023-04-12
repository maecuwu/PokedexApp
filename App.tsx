import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/screens/HomeScreen';
   
   
export const App = () => {
   return (
       <NavigationContainer>
            <HomeScreen />
       </NavigationContainer>
   )
}