import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './src/navigator/TabsNavigator';
   
   
export const App = () => {
   return (
       <NavigationContainer>
            <TabsNavigator />
       </NavigationContainer>
   )
}