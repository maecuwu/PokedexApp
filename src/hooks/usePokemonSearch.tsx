import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';


export const usePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const loadPokemons = async () => {

        setIsFetching(true);

        const { data } = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
        mapPokemonList(data.results);

        setIsFetching(false);
    }

    const mapPokemonList = (pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

            // https://pokeapi.co/api/v2/pokemon/15/
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return {
                name,
                picture,
                id
            }
        })

        setSimplePokemonList(newPokemonList);

    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        simplePokemonList,
        isFetching,
    }

}