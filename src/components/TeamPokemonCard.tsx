import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { PokemonCard } from './PokemonCard';



interface Props {
    pokemon?: SimplePokemon;
    index: number;
}

type ScreenNavigationProp = StackNavigationProp<TeamsRootStackParams, 'AddPokemonScreen'>;

export const TeamPokemonCard = ({ pokemon, index }: Props) => {

    const navigation = useNavigation<ScreenNavigationProp>();


    if (pokemon == null) {
        return (
            <View style={{ ...styles.pokemonContainer, justifyContent: 'center' }}>
                <View style={styles.addBtn}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('AddPokemonScreen', { editMode: false })}
                    >
                        <Icon name='add-outline' color='black' size={20} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}> Sin pokemon </Text>
            </View>
        )
    }

    return (
        <View style={{ ...styles.simplepokemonContainer, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.editBtn}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('AddPokemonScreen', { editMode: true, index })}
                >
                    <Icon name='pencil-outline' color='black' size={20} />
                </TouchableOpacity>
            </View>

            <PokemonCard pokemon={pokemon} addPossible={false} editPossible={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    pokemonContainer: {
        width: '45%',
        height: 100,
        backgroundColor: 'lightgrey',
        marginLeft: 10,
        marginBottom: 50,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    simplepokemonContainer: {
        width: '45%',
        height: 100,
        marginLeft: 10,
        marginBottom: 50,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    addBtn: {
        position: 'relative',
        top: -12,
        left: 100,
        zIndex: 9999,
        backgroundColor: 'lightgreen',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2
    },
    editBtn: {
        position: 'relative',
        top: 35,
        left: 55,
        zIndex: 999,
        backgroundColor: 'lightblue',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2
    }
})