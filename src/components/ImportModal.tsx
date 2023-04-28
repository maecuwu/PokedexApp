import { useEffect, useState, useContext } from 'react';
import { Button, Modal, Text, View, Dimensions, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Koffing } from 'koffing';

import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { pokemonApi } from '../api/pokemonApi';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { useForm } from '../hooks/useForm';




const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


interface Props {
    title: string;
    visibleLoad: boolean;
    onRedraw: any;
}

type ScreenNavigationProp = StackNavigationProp<TeamsRootStackParams, 'TeamScreen'>;

export const ImportModal = ({ title, visibleLoad, onRedraw }: Props) => {

    const [visible, setVisible] = useState(visibleLoad);

    const { importString, onChange } = useForm({
        importString: ''
    });
    const navigation = useNavigation<ScreenNavigationProp>();

    const { saveTeam, changeTeamName, changeTeamPokemons, PokemonTeam } = useContext(PokemonTeamContext);


    useEffect(() => {
        setVisible(!visible);
    }, [onRedraw])


    const getPokemonInfoByName = async(name: string): Promise<SimplePokemon> => {

        const pokemon = pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${name.toLocaleLowerCase()}`)
            .then( ({data}) => {
                const pokemonAux: SimplePokemon = {
                    id: data.id,
                    name: data.name,
                    picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
                }
                return pokemonAux;
            });
        
        return pokemon.then();
    }


    const onImport = async() => {
        setVisible(!visible);

        const parsedTeam = JSON.parse(Koffing.parse(importString).toJson());
        console.log(parsedTeam.teams[0].pokemon);

        changeTeamName(parsedTeam.teams[0].name);

        const pokemonsInTeam: SimplePokemon[] = [];
        const pokemons = parsedTeam.teams[0].pokemon;
        
        for (const pokemonAux of pokemons) {
            const pokemon = await getPokemonInfoByName(pokemonAux.name);
            pokemonsInTeam.push(pokemon);
        }

        changeTeamPokemons(pokemonsInTeam);
    }



    return (
        <Modal
            animationType='slide'
            visible={!visible}
            transparent={true}
        >
            <ScrollView contentContainerStyle={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: 'white',
                    width: screenWidth * 0.9,
                    height: screenHeight * 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: {
                        width: 0,
                        height: 10
                    },
                    shadowOpacity: 0.25,
                    elevation: 12,
                    borderRadius: 15,
                    borderColor: 'black',
                    paddingHorizontal: 20
                }}>
                    <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>
                        {title}
                    </Text>

                    <TextInput
                        style={styles.importInput}
                        value={importString}
                        onChangeText={(value) => onChange(value, 'importString')}
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.copyBtn}
                        onPress={() => setVisible(!visible)}
                    >
                        <Icon name='close-circle-outline' color='red' size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onImport}
                        style={styles.importBtn}
                    >
                        <Text style={{fontSize: 18, color: 'black'}}>
                            Importar
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </Modal>
    )
}

const styles = StyleSheet.create({
    copyBtn: {
        position: 'absolute',
        zIndex: 999,
        top: 20,
        right: 10
    },
    importInput: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        height: 50,
        width: '100%',
        marginVertical: 30,
    },
    importBtn: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue'
    }
});