import { Image, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';




type ScreenNavigationProp = StackNavigationProp<TeamsRootStackParams, 'TeamsScreen'>;


export const TeamsScreen = () => {

    const { top } = useSafeAreaInsets();
    const navigator = useNavigation<ScreenNavigationProp>();

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

                {/* <FlatList 
                data={}
                renderItem={}
                keyExtractor={}

                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <ActivityIndicator
                        style={{ height: 100 }}
                        size={25}
                        color='grey'
                    />
                }
            /> */}

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => navigator.navigate('TeamScreen')}
                >
                    <View style={styles.newTeamContainer}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}> 
                            Crear equipo 
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.cardContainer}>

                </View>
                <View style={styles.cardContainer}>

                </View>
                <View style={styles.cardContainer}>

                </View>

            </View>

        </>
    )
}



const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 100,
        backgroundColor: 'grey',
        marginVertical: 20,
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
    }
});