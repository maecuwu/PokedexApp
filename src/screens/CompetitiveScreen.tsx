import { Text, View } from 'react-native';
import { useScrapping } from '../hooks/useScrapping';
import { LoadingComponent } from '../components/LoadingComponent';


export const CompetitiveScreen = () => {

    const { pokemonNames, isLoading } = useScrapping();

    return (
        <View>
            {
                (isLoading)
                    ? <LoadingComponent />
                    : <Text> {JSON.stringify(pokemonNames, null, 3)} </Text>
            }
        </View>
    )
}