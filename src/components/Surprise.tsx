import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';



type ScreenNavigationProp = StackNavigationProp<TeamsRootStackParams, 'SurpriseScreen'>;

export const Surprise = () => {

    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={() => { navigation.navigate('SurpriseScreen') }}
            >
                <Image
                    source={require('../assets/pika.png')}
                    style={styles.pikachu}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        opacity: 0.2,
        marginLeft: 200,
        marginTop: 100,
    },
    pikachu: {
        width: 30,
        height: 30
    }
});