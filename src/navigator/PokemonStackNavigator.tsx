import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


export type PokemonRootStackParams = {
    HomeScreen: undefined;
    PokemonScreen: { 
        pokemon: SimplePokemon, 
        bgColor: string, 
        fontColor: string, 
        addPossible: boolean, 
        editPossible: boolean,
        editIndex?: number
    };
}


const Stack = createStackNavigator<PokemonRootStackParams>();

export const PokemonStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        </Stack.Navigator>
    );
}