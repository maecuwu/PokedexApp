import { Text, View, ActivityIndicator } from 'react-native';


export const LoadingComponent = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color='grey' />
            <Text> Cargando... </Text>
        </View>
    )
}