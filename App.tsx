import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import { TabsNavigator } from './src/navigator/TabsNavigator';
import { PokemonTeamProvider } from './src/context/PokemonTeamContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { useEffect } from 'react';


const AppState = ({ children }: any) => {
    return (
        <ThemeProvider>
            <PokemonTeamProvider>
                {children}
            </PokemonTeamProvider>
        </ThemeProvider>
    )
}


export const App = () => {

    useEffect(() => {
        SplashScreen.hide();
    }, []);
    
    return (
        <NavigationContainer>
            <AppState>
                <TabsNavigator />
            </AppState>
        </NavigationContainer>
    )
}