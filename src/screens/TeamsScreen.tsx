import { Image, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { useContext, useEffect, useState } from 'react';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { PokemonTeam } from '../interfaces/pokemonInterfaces';




type ScreenNavigationProp = StackNavigationProp<TeamsRootStackParams, 'TeamsScreen'>;


export const TeamsScreen = () => {

    const { top } = useSafeAreaInsets();
    const navigator = useNavigation<ScreenNavigationProp>();

    const { getAllTeams, getTeam } = useContext(PokemonTeamContext);
    const [allTeams, setallTeams] = useState<string[]>();
    const [teamsInfo, setTeamsInfo] = useState<PokemonTeam[]>([]);


    useEffect(() => {

        setallTeams([]);
        setTeamsInfo([]);
        getAllTeams().then((value) => {
            setallTeams(value);
        })

    }, [])

    useEffect(() => {
        allTeams?.forEach(e => {
            getTeam(e).then((value) => {
                setTeamsInfo([...teamsInfo, value]);
            });
        })
    }, [allTeams])



    return (
        <>

            <Image
                source={require('../assets/pokebola.png')}
                style={globalStyles.pokeballBackground}
            />

            <View style={{
                ...globalStyles.globalMargin,
                alignItems: 'center'
            }}>
                <Text style={{
                    ...globalStyles.title,
                    ...globalStyles.globalMargin,
                    color: 'black',
                    top: top + 20,
                    marginBottom: 20,
                    paddingBottom: 10
                }}>
                    Tus equipos
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigator.navigate('TeamScreen')}
                >
                    <View style={styles.newTeamContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                            Crear equipo
                        </Text>
                    </View>
                </TouchableOpacity>

                {
                    (teamsInfo.length !== undefined)
                        ? (
                            teamsInfo.map((equipo, index) => (
                                <View style={styles.cardContainer} key={equipo.name + index}>
                                    <Text style={{ fontSize: 20, color: 'black' }}>
                                        {equipo.name}
                                    </Text>

                                    <View style={styles.allPokemonContainer}>
                                    {
                                        equipo.pokemons.map(({ name, picture }, index) => (
                                            <View key={name + index}>
                                                <Image 
                                                    source={{ uri: picture }} 
                                                    style={styles.pokeImg}
                                                />
                                            </View>
                                        ))
                                    }
                                    </View>
                                </View>
                            ))
                        )
                        : (
                            <Text style={{ fontSize: 30, marginTop: 100 }}>
                                No hay equipos creados
                            </Text>
                        )
                }


            </View>

        </>
    )
}



const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 120,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    newTeamContainer: {
        width: 300,
        height: 40,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    allPokemonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    pokeImg: {
        width: 55,
        height: 55
    }
});