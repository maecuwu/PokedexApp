import { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { ThemeContext } from '../context/ThemeContext';


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

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: colors.background
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        </Stack.Navigator>
    );
}