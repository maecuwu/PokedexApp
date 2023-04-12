import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RootStackParams } from '../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';



interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };


export const PokemonScreen = ({ navigation, route }: Props) => {

    const { color, pokemon } = route.params;
    const { top } = useSafeAreaInsets();


    return (
        <View>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ ...styles.backButton, top: top + 10 }}
                    onPress={() => navigation.goBack()}
                >

                    <Icon name='arrow-back-outline' color='white' size={35} />

                </TouchableOpacity>

                <Text style={{ ...styles.pokemonName, top: top + 40 }}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1, 50)}
                    {'\n#' + pokemon.id}
                </Text>

                <Image 
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />

                <FadeInImage 
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        fontSize: 40,
        color: 'white',
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        top: 10,
        opacity: 0.6
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    }
})