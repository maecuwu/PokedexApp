import { useEffect, useRef, useState } from 'react'

import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';


export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=20')


    const loadPokemons = async () => {

        setIsLoading(true);

        const { data } = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = data.next;
        mapPokemonList(data.results);

        setIsLoading(false);
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

        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);

    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        simplePokemonList,
        isLoading,
        loadPokemons
    }

}