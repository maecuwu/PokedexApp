import { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { useTranslation } from 'react-i18next';

import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { ThemeContext } from '../context/ThemeContext';


interface Props {
    pokemon: FullPokemon;
    color: string;
    onScroll: (scrollValue: number) => void;
}


export const PokemonDetails = ({ pokemon, color, onScroll }: Props) => {

    const { t } = useTranslation("translation", { keyPrefix: "PokemonDetails" });

    const { theme: { colors } } = useContext(ThemeContext);

    const onHandleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollValue = event.nativeEvent.contentOffset.y;
        onScroll(scrollValue);
    }


    return (
        <ScrollView style={{ ...StyleSheet.absoluteFillObject }} showsVerticalScrollIndicator={false} 
            onScroll={(event) => onHandleScroll(event)}>

            {/* TIPOS Y PESO */}
            <View style={{ ...styles.container, marginTop: 370 }}>

                <Text style={{ ...styles.title, color: colors.text }}>
                    {t('types')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }, index) => (
                            <Text key={type.name + index}
                                style={{ ...styles.regularText, marginRight: 10, color: colors.text }}>
                                {type.name}
                            </Text>
                        ))
                    }
                </View>

                <Text style={{ ...styles.title, color: colors.text }}>
                    {t('weight')}
                </Text>
                <Text style={{ ...styles.regularText, marginRight: 10, color: colors.text }}>
                    {pokemon.weight}lb
                </Text>
            </View>

            {/* SPRITES */}
            <View style={styles.container}>
                <Text style={{ ...styles.title, color: colors.text }}>SPRITES</Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    (pokemon.sprites.front_default) &&
                    <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
                }
                {
                    (pokemon.sprites.back_default) &&
                    <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
                }
                {
                    (pokemon.sprites.front_shiny) &&
                    <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
                }
                {
                    (pokemon.sprites.back_shiny) &&
                    <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
                }
            </ScrollView>

            {/* HABILIDADES */}
            <View style={styles.container}>
                <Text style={{ ...styles.title, color: colors.text }}>
                    {t('habilities')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }, index) => (
                            <Text
                                key={ability.name + index}
                                style={{ ...styles.regularText, marginRight: 10, color: colors.text }}
                            >
                                {ability.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* MOVIMIENTOS */}
            <View style={styles.container}>
                <Text style={{ ...styles.title, color: colors.text }}>
                    {t('moves')}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }, index) => (
                            <Text
                                key={move.name +  index}
                                style={{ ...styles.regularText, marginRight: 10, color: colors.text }}
                            >
                                {move.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* ESTADISTICAS */}
            <View style={styles.container}>
                <Text style={{ ...styles.title, color: colors.text }}>
                    {t('stats')}
                </Text>
                <View>
                    {
                        pokemon.stats.map((stat) => (
                            <View style={{ flexDirection: 'row' }} key={stat.stat.name}>
                                <Text style={{ ...styles.regularText, marginRight: 10, color: colors.text }}>
                                    {stat.stat.name}
                                </Text>
                                <View style={{ ...styles.statBar, width: stat.base_stat, backgroundColor: color }} />
                                <Text style={{ ...styles.regularText, fontWeight: 'bold', marginLeft: 5, color: colors.text }}>
                                    {stat.base_stat}
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </View>

            {/* FINAL DE PAGINA */}
            <View style={{ ...styles.container, marginTop: 20, alignItems: 'center', marginBottom: 50 }}>
                <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19,
        opacity: 0.6
    },
    basicSprite: {
        width: 100,
        height: 100
    },
    statBar: {
        height: 10,
        top: 9
    }
})