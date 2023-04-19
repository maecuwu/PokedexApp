import { StackScreenProps } from '@react-navigation/stack';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';




interface Props extends StackScreenProps<TeamsRootStackParams, 'TeamScreen'> { };


export const TeamScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ ...styles.backButton, top: top + 10 }}
                onPress={() => navigation.goBack()}
            >

                <Icon name='arrow-back-outline' color='black' size={35} />

            </TouchableOpacity>
        </View>
    )
}



export const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        left: 20
    },
});