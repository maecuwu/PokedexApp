import { AxiosError } from "axios";
import { webScrapping } from "../api/webScrapping";
import * as cheerio from "cheerio";
import { useState, useEffect } from 'react';


export const useScrapping = () => {

    const [pokemonNames, setPokemonNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadPokemonNames = () => {

        setIsLoading(true);

        webScrapping
            .then(({ data }) => {
                const $ = cheerio.load(data);

                const pokemonElements = $('span.pokemon-name').toArray();

                const pokeNames = pokemonElements.map(poke => $.html(poke));

                pokeNames.forEach(e => {
                    setPokemonNames(pokemonNames => [...pokemonNames, e.substring(27).slice(0, -7).trim()]);
                });
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })

        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemonNames()
    }, [])


    return {
        pokemonNames,
        isLoading
    }
}