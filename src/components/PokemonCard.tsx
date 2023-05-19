import { useEffect, useState, useRef } from 'react';
import { Dimensions, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { PokemonRootStackParams } from '../navigator/PokemonStackNavigator';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


const { width: windowWidth } = Dimensions.get('window');

interface Props {
    pokemon: SimplePokemon;
    addPossible: boolean;
    editPossible: boolean;
    index?: number;
}

type ScreenNavigationProp = StackNavigationProp<PokemonRootStackParams, 'PokemonScreen'>;

export const PokemonCard = ({ pokemon, addPossible, editPossible, index }: Props) => {

    const [bgColor, setBgColor] = useState('grey');
    const [fontColor, setFontColor] = useState('white');
    const isMounted = useRef(true);
    const navigator = useNavigation<ScreenNavigationProp>();


    useEffect(() => {

        ImageColors.getColors(pokemon.picture, { fallback: 'grey' }).then(
            (colors: any) => {

                if (colors.platform === 'android') {
                    setBgColor(colors.dominant || 'grey')
                    setFontColor(colors.average || 'white');
                }
            },
        );

        return () => {
            isMounted.current = false;
        }
    }, [pokemon]);

    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => navigator.navigate('PokemonScreen', {
                pokemon,
                bgColor,
                fontColor,
                addPossible,
                editPossible,
                editIndex: index
            })}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>

                <View style={styles.nameContainer}>
                    <Text style={{...styles.name, color: fontColor}}>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1, 50)}
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
    nameContainer: {
        position: 'absolute',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        top: 5,
        left: 10,        
    },
    pokeball: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokeballContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.7
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -5,
        bottom: -5,
    }
})