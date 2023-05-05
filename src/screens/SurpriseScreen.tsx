import { useContext, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, PanResponder } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import Sound from 'react-native-sound';

import { ThemeContext } from '../context/ThemeContext';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';


interface Props extends StackScreenProps<TeamsRootStackParams, 'SurpriseScreen'> { };

export const SurpriseScreen = ({ navigation }: Props) => {

    const pan = useRef(new Animated.ValueXY()).current;

    const { top } = useSafeAreaInsets();
    const { theme: { colors } } = useContext(ThemeContext);

    let touches: number = 0;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x, dy: pan.y, },
            ],
            {
                useNativeDriver: false
            }
        ),
        onPanResponderRelease: () => {
            Animated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
            ).start();
            touches++;  
            checkEnfado();           


        },
    });

    const checkEnfado = () => {
        if (touches == 10){
            Sound.setCategory('Playback');

            let sound = new Sound('thunder-sound.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('No se pudo reproducir')
                    return;
                }
            });
            sound.setVolume(1);
            sound.play();

            setTimeout(() => {
                navigation.pop();
            }, (1000));
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity
                activeOpacity={0.7}
                style={{ ...styles.backButton, top: top + 10 }}
                onPress={() => navigation.pop()}
            >

                <Icon name='arrow-back-outline' color={colors.text} size={35} />

            </TouchableOpacity>

            <Animated.Image
                {...panResponder.panHandlers}
                source={require('../assets/pika.png')}
                style={[styles.pikachu, pan.getLayout()]}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        left: 20
    },
    pikachu: {
        width: 200,
        height: 200
    }
});