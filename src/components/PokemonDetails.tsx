import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useTranslation } from 'react-i18next';


interface Props {
    pokemon: FullPokemon;
    color: string;
}


export const PokemonDetails = ({ pokemon, color }: Props) => {

    const { t } = useTranslation("translation", { keyPrefix: "PokemonDetails" });

    return (
        <ScrollView style={{ ...StyleSheet.absoluteFillObject }} showsVerticalScrollIndicator={false}>

            {/* TIPOS Y PESO */}
            <View style={{ ...styles.container, marginTop: 370 }}>

                <Text style={styles.title}>
                    {t('types')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text key={type.name}
                                style={{ ...styles.regularText, marginRight: 10 }}> 
                                {type.name} 
                            </Text>
                        ))
                    }
                </View>

                <Text style={styles.title}>
                    {t('weight')}
                </Text>
                <Text style={{ ...styles.regularText, marginRight: 10 }}> {pokemon.weight}lb</Text>
            </View>

            {/* SPRITES */}
            <View style={styles.container}>
                <Text style={styles.title}>SPRITES</Text>
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
                <Text style={styles.title}>
                    {t('habilities')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text key={ability.name}
                                style={{ ...styles.regularText, marginRight: 10 }}> {ability.name} </Text>
                        ))
                    }
                </View>
            </View>

            {/* MOVIMIENTOS */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    {t('moves')}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text
                                key={move.name}
                                style={{ ...styles.regularText, marginRight: 10 }}>
                                {move.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* ESTADISTICAS */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    {t('stats')}
                </Text>
                <View>
                    {
                        pokemon.stats.map((stat) => (
                            <View style={{ flexDirection: 'row' }} key={stat.stat.name}>
                                <Text style={{ ...styles.regularText, marginRight: 10 }}>
                                    {stat.stat.name}
                                </Text>
                                <View style={{ ...styles.statBar, width: stat.base_stat, backgroundColor: color }} />
                                <Text style={{ ...styles.regularText, fontWeight: 'bold', marginLeft: 5 }}>
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
        color: 'black',
        marginTop: 20
    },
    regularText: {
        fontSize: 19
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