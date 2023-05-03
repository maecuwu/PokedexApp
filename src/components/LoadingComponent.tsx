import { useTranslation } from 'react-i18next';
import { Text, View, ActivityIndicator } from 'react-native';


export const LoadingComponent = () => {

    const { t } = useTranslation("translation")

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color='grey' />
            <Text>
                {t('loading')}
            </Text>
        </View>
    )
}