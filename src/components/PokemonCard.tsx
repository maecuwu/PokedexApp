import { Dimensions, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


const { width: windowWidth } = Dimensions.get('window');

interface Props {
    pokemon: SimplePokemon;
}


export const PokemonCard = ({ pokemon }: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.7}>
            <View style={{ ...styles.cardContainer, width: windowWidth * 0.4 }}>

                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokeballContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokeball}
                    />
                </View>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokeball: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokeballContainer:{
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -5,
        bottom: -5
    }
})