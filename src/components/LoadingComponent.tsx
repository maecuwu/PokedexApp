import { useContext } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { useTranslation } from 'react-i18next';

import { ThemeContext } from '../context/ThemeContext';


export const LoadingComponent = () => {

    const { t } = useTranslation("translation");
    const { theme: { dark, colors } } = useContext(ThemeContext);

    if (dark) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color='white' />
                <Text style={{color: colors.text}}>
                    {t('loading')}
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color='grey' />
            <Text>
                {t('loading')}
            </Text>
        </View>
    )
}