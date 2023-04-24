import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';


export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={globalStyles.pokeballBackground}
            />
            <View style={{
                ...globalStyles.globalMargin,
                alignItems: 'center'
            }}>
                <FlatList
                    ListHeaderComponent={
                        <Text style={{
                            ...globalStyles.title,
                            ...globalStyles.globalMargin,
                            top: top + 20,
                            color: 'black',
                            marginBottom: 20,
                            paddingBottom: 10
                        }}>
                            Pokedex
                        </Text>
                    }

                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <PokemonCard pokemon={item} addPossible={false}/>
                    )}

                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.5}

                    ListFooterComponent={
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={25}
                            color='grey'
                        />
                    }
                />
            </View>
        </>
    )
}