import { useEffect, useState, useContext } from 'react';
import { Modal, Text, View, Dimensions, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Koffing } from 'koffing';
import { useTranslation } from 'react-i18next';

import { pokemonApi } from '../api/pokemonApi';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { useForm } from '../hooks/useForm';
import { ThemeContext } from '../context/ThemeContext';




const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


interface Props {
    title: string;
    visibleLoad: boolean;
    onRedraw: any;
}


export const ImportModal = ({ title, visibleLoad, onRedraw }: Props) => {

    const { t } = useTranslation("translation", { keyPrefix: "ImportModal" });

    const { theme: { colors } } = useContext(ThemeContext);

    const [visible, setVisible] = useState(visibleLoad);
    const { importString, onChange } = useForm({
        importString: ''
    });

    const { changeTeamName, changeTeamPokemons } = useContext(PokemonTeamContext);


    useEffect(() => {
        setVisible(!visible);
    }, [onRedraw])


    const getPokemonInfoByName = async (name: string): Promise<SimplePokemon> => {

        const pokemon = pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${name.toLocaleLowerCase()}`)
            .then(({ data }) => {
                const pokemonAux: SimplePokemon = {
                    id: data.id,
                    name: data.name,
                    picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
                }
                return pokemonAux;
            });

        return pokemon.then();
    }


    const onImport = async () => {
        console.log('importando');

        setVisible(!visible);

        const parsedTeam = JSON.parse(Koffing.parse(importString).toJson());

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
                    backgroundColor: colors.background,
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
                    borderColor: colors.border,
                    paddingHorizontal: 20
                }}>
                    <Text style={{ fontSize: 20, color: colors.text, textAlign: 'center' }}>
                        {title}
                    </Text>

                    <TextInput
                        style={{ ...styles.importInput, borderColor: colors.text, color: colors.text }}
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
                        onPress={onImport}
                        style={styles.importBtn}
                    >
                        <Text style={{ fontSize: 18, color: 'black' }}>
                            {t('import')}
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