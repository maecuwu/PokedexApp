import { useEffect, useState } from 'react'

import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemon = (id: string) => {


    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<FullPokemon>();


    const getPokemonInfo = async () => {

        setIsLoading(true);

        try {
            const { data } = await pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(data);
        } catch (error: any) {
            console.log(error.response);
        }

        setIsLoading(false);

    }


    useEffect(() => {
        getPokemonInfo();
    }, [])



    return {
        isLoading,
        pokemon
    }
}
