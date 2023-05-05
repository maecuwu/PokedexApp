import { Image, StyleSheet, Text, View } from 'react-native';
import { usePokemon } from '../hooks/usePokemon';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    pokemonName: string;
    pokemonPercentage: string;
}

export const CompetitivePokemon = ({ pokemonName, pokemonPercentage }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);
    const { t } = useTranslation("translation", { keyPrefix: "competitivePokemon" })

    const correctPokemonName = pokemonName.trim().replace(" ", "-")
        .toLowerCase().replace("-f", "-female");
    const { pokemon } = usePokemon(correctPokemonName);


    if (pokemon == undefined) {
        return (
            <Text style={{ color: colors.text, textAlign: 'center', marginVertical: 10 }}>
                {t('notLoaded')}
            </Text>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.pokeImg}
            />
            <Text style={{...styles.pokeInfo, color: colors.text}}>
                #{pokemon.id}   {pokemonName}   {pokemonPercentage}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pokeImg: {
        width: 80,
        height: 80
    },
    pokeInfo: {
        fontSize: 16
    }
});