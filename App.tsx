import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { TabsNavigator } from './src/navigator/TabsNavigator';
import { PokemonTeamProvider } from './src/context/PokemonTeamContext';
import { ThemeProvider } from './src/context/ThemeContext';


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
    return (
        <NavigationContainer>
            <AppState>
                <TabsNavigator />
            </AppState>
        </NavigationContainer>
    )
}