import { StackScreenProps } from '@react-navigation/stack';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { useState, useContext } from 'react';
import { globalStyles } from '../theme/appTheme';
import { TeamPokemonCard } from '../components/TeamPokemonCard';
import { PokemonTeamContext } from '../context/PokemonTeamContext';




const { width: screenWidth } = Dimensions.get('window');


interface Props extends StackScreenProps<TeamsRootStackParams, 'TeamScreen'> { };


export const TeamScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();

    const { PokemonTeamState: {name, pokemons}, saveTeam, changeTeamName, getTeam } = useContext(PokemonTeamContext);
    

    return (
        <View style={{ flex: 1 }}>

            <View style={{
                ...styles.headerContainer,
            }}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ ...styles.backButton, top: top + 10 }}
                    onPress={() => navigation.goBack()}
                >

                    <Icon name='arrow-back-outline' color='black' size={35} />

                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', ...globalStyles.globalMargin }}>
                <View style={{ ...styles.textBackground, width: screenWidth - 40 }}>
                    <TextInput
                        placeholder='Nombre del equipo'
                        style={styles.textInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={name}
                        onChangeText={(value) => changeTeamName(value)}
                    />
                </View>

                <View style={styles.teamContainer}>
                    <TeamPokemonCard pokemon={pokemons[0]}/>
                    <TeamPokemonCard pokemon={pokemons[1]}/>
                    <TeamPokemonCard pokemon={pokemons[2]}/>
                    <TeamPokemonCard pokemon={pokemons[3]}/>
                    <TeamPokemonCard pokemon={pokemons[4]}/>
                    <TeamPokemonCard pokemon={pokemons[5]}/>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.saveBtn}
                    onPress={saveTeam}
                >
                    <Text style={{ ...globalStyles.title, color: 'black', fontSize: 20 }}> Guardar </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}



export const styles = StyleSheet.create({
    headerContainer: {
        height: 10,
        zIndex: 999,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        marginTop: 60,
        borderRadius: 30,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        top: 2
    },
    teamContainer: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    saveBtn: {
        marginTop: 30,
        width: 280,
        height: 40,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});