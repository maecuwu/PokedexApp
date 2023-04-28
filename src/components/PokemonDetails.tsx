import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


interface Props {
    pokemon: FullPokemon;
    color: string;
}


export const PokemonDetails = ({ pokemon, color }: Props) => {
    return (
        <ScrollView style={{ ...StyleSheet.absoluteFillObject }} showsVerticalScrollIndicator={false}>

            {/* TIPOS Y PESO */}
            <View style={{ ...styles.container, marginTop: 370 }}>

                <Text style={styles.title}>TIPOS</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text key={type.name}
                                style={{ ...styles.regularText, marginRight: 10 }}> {type.name} </Text>
                        ))
                    }
                </View>

                <Text style={styles.title}>Peso</Text>
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
                <Text style={styles.title}>HABILIDADES</Text>
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
                <Text style={styles.title}>MOVIMIENTOS</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text key={move.name}
                                style={{ ...styles.regularText, marginRight: 10 }}> {move.name} </Text>
                        ))
                    }
                </View>
            </View>

            {/* ESTADISTICAS */}
            <View style={styles.container}>
                <Text style={styles.title}>ESTADÍSTICAS</Text>
                <View>
                    {
                        pokemon.stats.map((stat) => (
                            <View style={{ flexDirection: 'row' }} key={stat.stat.name}>
                                <Text style={{ ...styles.regularText, marginRight: 10 }}> {stat.stat.name} </Text>
                                <View style={{ ...styles.statBar, width: stat.base_stat, backgroundColor: color }}></View>
                                <Text style={{ ...styles.regularText, fontWeight: 'bold' }}> {stat.base_stat} </Text>
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