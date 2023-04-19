import { createStackNavigator } from '@react-navigation/stack';
import { TeamScreen } from '../screens/TeamScreen';
import { TeamsScreen } from '../screens/TeamsScreen';


export type TeamsRootStackParams = {
    TeamsScreen: undefined;
    TeamScreen: undefined;
}


const Stack = createStackNavigator<TeamsRootStackParams>();

export const TeamsStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="TeamsScreen" component={TeamsScreen} />
            <Stack.Screen name="TeamScreen" component={TeamScreen} />
        </Stack.Navigator>
    );
}