import { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';
import { globalStyles } from '../theme/appTheme';
import { TeamPokemonCard } from '../components/TeamPokemonCard';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { Spacer } from '../components/Spacer';
import { ExportModal } from '../components/ExportModal';
import { ImportModal } from '../components/ImportModal';
import { ThemeContext } from '../context/ThemeContext';




const { width: screenWidth } = Dimensions.get('window');


interface Props extends StackScreenProps<TeamsRootStackParams, 'TeamScreen'> { };


export const TeamScreen = ({ navigation, route }: Props) => {

    const team = route.params.pokemonTeam;
    const editMode = route.params.editMode;

    const { top } = useSafeAreaInsets();

    const { theme: { colors } } = useContext(ThemeContext);

    const { t } = useTranslation("translation", { keyPrefix: "TeamScreen" });

    const [nameChanged, setNameChanged] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [exportString, setExportString] = useState('');

    const { saveTeam, changeTeamName, getTeam, changeTeamPokemons, deleteTeam } = useContext(PokemonTeamContext);
    let { PokemonTeam: { name, pokemons } } = useContext(PokemonTeamContext);


    useEffect(() => {

        if (team !== undefined) {
            getTeam(team).then((equipo) => {
                changeTeamName(equipo.name);
                changeTeamPokemons(equipo.pokemons);
                return;
            })
        }

        changeTeamName(t('defaultTeamName'));
        changeTeamPokemons([]);

    }, [])

    useEffect(() => {

        if (modalVisible == true && editMode) {
            const exportString = `            
    ${pokemons[0]?.name.charAt(0).toLocaleUpperCase() + pokemons[0].name.substring(1, 100)}
    Level 100
    
    ${pokemons[1]?.name.charAt(0).toLocaleUpperCase() + pokemons[1].name.substring(1, 100)}
    Level 100
    
    ${pokemons[2]?.name.charAt(0).toLocaleUpperCase() + pokemons[2].name.substring(1, 100)}
    Level 100
    
    ${pokemons[3]?.name.charAt(0).toLocaleUpperCase() + pokemons[3].name.substring(1, 100)}
    Level 100
    
    ${pokemons[4]?.name.charAt(0).toLocaleUpperCase() + pokemons[4].name.substring(1, 100)}
    Level 100
    
    ${pokemons[5]?.name.charAt(0).toLocaleUpperCase() + pokemons[5].name.substring(1, 100)}
    Level 100`

            setExportString(exportString);
        }
    }, [modalVisible])


    const onChangeTeamName = (name: string) => {
        changeTeamName(name);
        setNameChanged(true);
    }

    const onSaveTeam = () => {

        if (editMode) {
            if (nameChanged && team !== undefined) {
                getTeam(team).then((eq) => {
                    deleteTeam(eq.name);
                })
            }
        }

        saveTeam();
        navigation.navigate('TeamsScreen');
    }

    return (
        <ScrollView style={{ flex: 1 }}>

            <View style={{
                ...styles.headerContainer,
            }}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ ...styles.backButton, top: top + 10 }}
                    onPress={() => navigation.goBack()}
                >

                    <Icon name='arrow-back-outline' color={colors.text} size={35} />

                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', ...globalStyles.globalMargin }}>
                <View style={{ ...styles.textBackground, width: screenWidth - 40 }}>
                    <TextInput
                        placeholder={t('placeholderTeamInput').toString()}
                        style={styles.textInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={name}
                        onChangeText={(value) => onChangeTeamName(value)}
                    />
                </View>

                {
                    (editMode)
                        ? (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ ...styles.saveBtn, backgroundColor: 'orange' }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={{ ...globalStyles.title, color: 'black', fontSize: 20 }}>
                                        {t('export')}
                                    </Text>
                                </TouchableOpacity>

                                <ExportModal
                                    bodyText={exportString}
                                    title={t('exportModal')}
                                    visibleLoad={modalVisible}
                                    onRedraw={modalVisible}
                                />
                            </>
                        )
                        : (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ ...styles.saveBtn, backgroundColor: 'orange' }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={{ ...globalStyles.title, color: 'black', fontSize: 20 }}>
                                        {t('import')}
                                    </Text>
                                </TouchableOpacity>

                                <ImportModal
                                    title={t('importModal')}
                                    visibleLoad={modalVisible}
                                    onRedraw={modalVisible}
                                />
                            </>
                        )
                }


                <View style={styles.teamContainer}>
                    <TeamPokemonCard pokemon={pokemons[0]} index={0} />
                    <TeamPokemonCard pokemon={pokemons[1]} index={1} />
                    <TeamPokemonCard pokemon={pokemons[2]} index={2} />
                    <TeamPokemonCard pokemon={pokemons[3]} index={3} />
                    <TeamPokemonCard pokemon={pokemons[4]} index={4} />
                    <TeamPokemonCard pokemon={pokemons[5]} index={5} />
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.saveBtn}
                    onPress={onSaveTeam}
                >
                    <Text style={{ ...globalStyles.title, color: 'black', fontSize: 20 }}>
                        {t('saveBtn')}
                    </Text>
                </TouchableOpacity>

            </View>
            <Spacer />
        </ScrollView>
    )
}



const styles = StyleSheet.create({
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