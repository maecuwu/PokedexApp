import { useContext, useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, RefreshControl, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { globalStyles } from '../theme/appTheme';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { MiniPokemonImage } from '../components/MiniPokemonImage';
import { Spacer } from '../components/Spacer';
import { ThemeContext } from '../context/ThemeContext';


type ScreenNavigationProp = StackNavigationProp<TeamsRootStackParams, 'TeamsScreen'>;


export const TeamsScreen = () => {

    const { top } = useSafeAreaInsets();

    const navigator = useNavigation<ScreenNavigationProp>();

    const { theme: { colors, dark } } = useContext(ThemeContext);
    const { t } = useTranslation("translation", { keyPrefix: "TeamsScreen" });

    const { getAllTeams, deleteTeam } = useContext(PokemonTeamContext);

    const [refreshing, setRefreshing] = useState(false);
    const [allTeams, setallTeams] = useState<string[]>();


    useEffect(() => {
        getTeams();
    }, [])

    const getTeams = async () => {
        setRefreshing(true);

        setallTeams([]);
        const teams = await getAllTeams();
        setallTeams(teams);

        setRefreshing(false);
    }

    const onDelete = (teamName: string) => {
        deleteTeam(teamName);

        setRefreshing(true);
        getTeams();
        setRefreshing(false);
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={getTeams}
                    progressViewOffset={200}
                    colors={[
                        'red', 'lightgreen', 'black'
                    ]}
                />
            }
        >

            {
                (dark)
                    ? <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={globalStyles.pokeballBackground}
                    />
                    : <Image
                        source={require('../assets/pokebola.png')}
                        style={globalStyles.pokeballBackground}
                    />
            }

            <View style={{
                ...globalStyles.globalMargin,
                alignItems: 'center'
            }}>
                <Text style={{
                    ...globalStyles.title,
                    ...globalStyles.globalMargin,
                    color: colors.text,
                    top: top + 20,
                    marginBottom: 20,
                    paddingBottom: 10
                }}>
                    {t('title')}
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigator.navigate('TeamScreen', { editMode: false })}
                >
                    <View style={styles.newTeamContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                            {t('createTeam')}
                        </Text>
                    </View>
                </TouchableOpacity>

                {
                    (allTeams?.length !== undefined)
                        ? (
                            allTeams.map((equipo, index) => (
                                <View style={styles.cardContainer} key={equipo + index}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            navigator.navigate('TeamScreen', { pokemonTeam: equipo, editMode: true })
                                        }
                                    >
                                        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>
                                            {equipo}
                                        </Text>

                                        <View style={styles.deleteBtn}>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => onDelete(equipo)}
                                            >
                                                <Icon name='close-outline' color='black' size={20} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.allPokemonContainer}>
                                            {
                                                <MiniPokemonImage teamName={equipo} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        )
                        : (
                            <Text style={{ fontSize: 30, marginTop: 100 }}>
                                {t('noTeams')}
                            </Text>
                        )
                }


            </View>

            <Spacer />
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 120,
        marginTop: 20,
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
        marginBottom: 20,
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
    deleteBtn: {
        position: 'relative',
        top: -20,
        left: 270,
        zIndex: 9999,
        backgroundColor: '#FF8E8E',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2
    },
});