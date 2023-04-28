import { useEffect, useState } from 'react';
import { Button, Modal, Text, View, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';




const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


interface Props {
    title: string;
    bodyText: string;
    visibleLoad: boolean;
    onRedraw: any;
}

export const ExportModal = ({ bodyText, title, visibleLoad, onRedraw }: Props) => {

    const [visible, setVisible] = useState(visibleLoad);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setVisible(!visible);
    }, [onRedraw])


    useEffect(() => {
        if (copied == true){
            setTimeout(() => {
                setCopied(false);
            }, 1500);
        }
    }, [copied])
    
    const copyClipboard = () => {

        setCopied(true);

        Clipboard.setString(bodyText);
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
                    height: screenHeight * 0.9,
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
                    borderWidth: 1,
                    paddingHorizontal: 20
                }}>

                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>
                            {title}
                        </Text>

                        <Text style={{ fontSize: 16, marginBottom: 20, marginTop: 10, color: 'black' }}>
                            {bodyText}
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setVisible(!visible)}
                        style={styles.closeBtn}
                    >
                        <Text style={{fontSize: 18, color: 'black'}}>
                            Cerrar
                        </Text>
                    </TouchableOpacity>

                    {
                        (copied)
                            ? (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.copyBtn}                                    
                                >
                                    <Icon name='checkmark-circle-outline' color='green' size={30} />
                                </TouchableOpacity>
                            )
                            : (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.copyBtn}
                                    onPress={copyClipboard}
                                >
                                    <Icon name='copy-outline' color='black' size={30} />
                                </TouchableOpacity>
                            )
                    }
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
    closeBtn: {
        marginBottom: 30,
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