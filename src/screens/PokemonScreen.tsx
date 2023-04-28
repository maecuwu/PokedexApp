import { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokemonRootStackParams } from '../navigator/PokemonStackNavigator';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';
import { PokemonTeamContext } from '../context/PokemonTeamContext';



const { height: screenHeight } = Dimensions.get('window');


interface Props extends StackScreenProps<PokemonRootStackParams, 'PokemonScreen'> { };


export const PokemonScreen = ({ navigation, route }: Props) => {

    const { bgColor, pokemon, fontColor, addPossible, editPossible, editIndex } = route.params;
    const { top } = useSafeAreaInsets();

    const { isLoading, pokemon: pokemonInfo } = usePokemon(pokemon.id);
    const { addPokemon, editPokemon } = useContext(PokemonTeamContext);

    const showAlertAdd = () => {

        if (addPokemon(pokemon)) {
            Alert.alert(
                'Pokemon añadido',
                `${pokemon.name} añadido a tu equipo`,
                [
                    { text: 'OK' },
                ]);
        } else {
            Alert.alert(
                'Pokemon no añadido',
                'No se ha podido añadir el pokemon a tu equipo',
                [
                    { text: 'OK' },
                ]);
        }
    }

    const showAlertEdit = () => {

        editPokemon(editIndex!, pokemon);

        Alert.alert(
            'Pokemon añadido',
            `${pokemon.name} añadido a tu equipo y el anterior ha sido eliminado`,
            [
                { text: 'OK' },
            ]);
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: bgColor,
                height: screenHeight * 0.5
            }}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ ...styles.backButton, top: top + 10 }}
                    onPress={() => navigation.goBack()}
                >

                    <Icon name='arrow-back-outline' color={fontColor} size={35} />

                </TouchableOpacity>

                {
                    (addPossible)
                    && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ ...styles.addButton, top: top + 30 }}
                            onPress={showAlertAdd}
                        >

                            <Icon name='add-circle-outline' color={fontColor} size={35} />

                        </TouchableOpacity>
                    )
                }

                {
                    (editPossible)
                    && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ ...styles.addButton, top: top + 30 }}
                            onPress={showAlertEdit}
                        >

                            <Icon name='pencil-outline' color={fontColor} size={35} />

                        </TouchableOpacity>
                    )
                }



                <Text style={{ ...styles.pokemonName, top: top + 40, color: fontColor }}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1, 50)}
                    {'\n#' + pokemon.id}
                </Text>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>

            {
                isLoading
                    ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={bgColor} size={50} />
                        </View>
                    )
                    : <PokemonDetails pokemon={pokemonInfo!} color={bgColor} />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    addButton: {
        position: 'absolute',
        right: 20
    },
    pokemonName: {
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})