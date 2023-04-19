import { Text, View, StyleSheet } from 'react-native';
import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';



interface Props {
    pokemon?: FullPokemon;
}


export const TeamPokemonCard = ({ pokemon }: Props) => {


    if (pokemon == null) {
        return (
            <View style={{ ...styles.pokemonContainer, justifyContent: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addBtn}
                >
                    <Icon name='add-outline' color='black' size={20} />
                </TouchableOpacity>
                <Text style={styles.title}> Sin pokemon </Text>
            </View>
        )
    }


    return (
        <View style={{ ...styles.pokemonContainer, justifyContent: 'center' }}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.editBtn}
            >
                <Icon name='pencil-outline' color='black' size={20} />
            </TouchableOpacity>
            <Text style={styles.title}> {pokemon.name} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pokemonContainer: {
        width: '40%',
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
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    addBtn: {
        position: 'relative',
        top: -12,
        left: 100,
        zIndex: 999,
        backgroundColor: 'lightgreen',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2
    },
    editBtn: {
        position: 'relative',
        top: -12,
        left: 100,
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