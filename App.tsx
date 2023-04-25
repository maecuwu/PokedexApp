import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './src/navigator/TabsNavigator';
import { PokemonTeamProvider } from './src/context/PokemonTeamContext';



const AppState = ({ children }: any) => {
    return (
        <PokemonTeamProvider>
            {children}
        </PokemonTeamProvider>
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