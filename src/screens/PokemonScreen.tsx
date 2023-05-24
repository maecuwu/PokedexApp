import { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions, Image } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { PokemonRootStackParams } from '../navigator/PokemonStackNavigator';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { CommonActions, useNavigation } from '@react-navigation/native';



const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


interface Props extends StackScreenProps<PokemonRootStackParams, 'PokemonScreen'> { };


export const PokemonScreen = ({ navigation, route }: Props) => {

    const { bgColor, pokemon, fontColor, addPossible, editPossible, editIndex, deleteMode } = route.params;

    const [scrollValue, setScrollValue] = useState(0);
    const [collapseHeader, setCollapseHeader] = useState(false);

    const { top } = useSafeAreaInsets();
    const navigatorT = useNavigation();

    const { t } = useTranslation("translation", { keyPrefix: "AddPokemonScreen" })

    const { isLoading, pokemon: pokemonInfo } = usePokemon(pokemon.id);
    const { addPokemon, editPokemon, deletePokemon, PokemonTeam } = useContext(PokemonTeamContext);

    useEffect(() => {
        if (scrollValue >= 150) {
            setCollapseHeader(true);
        } else {
            setCollapseHeader(false);
        }
        console.log(collapseHeader);
    }, [scrollValue])



    const handleScroll = (value: number) => {
        setScrollValue(value);
    }

    const showAlertAdd = () => {

        if (addPokemon(pokemon)) {
            Alert.alert(
                t('addedPokemonTitle'),
                `${pokemon.name} ${t('addedPokemon')}`,
                [
                    { text: 'OK' },
                ]);
        } else {
            Alert.alert(
                t('notAddedPokemonTitle'),
                `${t('notAddedPokemon')}`,
                [
                    { text: 'OK' },
                ]);
        }
    }

    const showAlertEdit = () => {

        editPokemon(editIndex!, pokemon);

        Alert.alert(
            t('addedPokemonTitle'),
            `${pokemon.name} ${t('pokemonReplaced')}`,
            [
                { text: 'OK' },
            ]);
    }

    const showAlertDelete = () => {
        Alert.alert(
            t('deletePokemonTitle'),
            `${t('deletePokemon')}`,
            [
                {
                    text: `${t('cancelBtn')}`,
                    style: 'cancel'
                },
                {
                    text: `${t('deleteBtn')}`,
                    style: 'destructive',
                    onPress: deleteIndex
                }
            ]
        )
    }

    const deleteIndex = () => {
        deletePokemon(editIndex!);
        navigatorT.dispatch(
            CommonActions.navigate('TeamsScreen')
        )
    }


    return (
        <View style={{ flex: 1 }}>

            {
                (!collapseHeader)
                    ? (
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

                            {
                                (deleteMode)
                                && (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={{ ...styles.addButton, top: top + 30 }}
                                        onPress={showAlertDelete}
                                    >

                                        <Icon name='trash-outline' color={fontColor} size={35} />

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
                    )
                    : (
                        <View style={{
                            backgroundColor: bgColor,
                            height: screenHeight * 0.1,
                            ...styles.collapsedHeader
                        }}>
                            <View style={{ ...styles.backButton, top: top + 10 }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon name='arrow-back-outline' color={fontColor} size={35} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: top + 10, alignItems: 'center' }}>
                                <Text style={{ ...styles.pokemonNameCollapsed, color: fontColor }}>
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1, 50)}
                                </Text>

                                <Image
                                    source={{ uri: pokemon.picture }}
                                    style={{ ...styles.pokemonImageCollapsed, top: top }}
                                />
                            </View>
                        </View>
                    )
            }


            {
                isLoading
                    ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={bgColor} size={50} />
                        </View>
                    )
                    : <PokemonDetails pokemon={pokemonInfo!} color={bgColor} onScroll={handleScroll} />
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
        left: 20,
        zIndex: 99999
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
    collapsedHeader: {
        zIndex: 10,
    },
    pokemonNameCollapsed: {
        fontSize: 25,
        marginLeft: screenWidth * 0.25,
        flexWrap: 'wrap'
    },
    pokemonImageCollapsed: {
        width: 60,
        height: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})