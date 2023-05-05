import { useState, useEffect } from 'react';

import * as cheerio from "cheerio";

import { webScrapping } from "../api/webScrapping";


export const useScrapping = () => {

    const [tournamentTitle, setTournamentTitle] = useState('');
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);
    const [usagePercentages, setUsagePercentages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPokemonNames()
    }, [])


    const loadPokemonNames = async () => {

        setIsLoading(true);

        try {

            const { data } = await webScrapping;
            const $ = cheerio.load(data);

            const tournamentTitle = $('select option').contents().first().text();
            setTournamentTitle(tournamentTitle);

            const percentagesElements = $('a.pokedex_entry > span.float-right').toArray();
            const percentages = percentagesElements.map(p => $.html(p));
            percentages.forEach(p => {
                setUsagePercentages(usagePercentages => [...usagePercentages, p.substring(42).slice(0, -7).trim()])
            });

            const pokemonElements = $('span.pokemon-name').toArray();
            const pokeNames = pokemonElements.map(poke => $.html(poke));
            pokeNames.forEach(e => {
                setPokemonNames(pokemonNames => [...pokemonNames, e.substring(27).slice(0, -7).trim()]);
            });

        } catch (error) {
            console.log({ error });
        }

        setIsLoading(false);
    }



    return {
        tournamentTitle,
        pokemonNames,
        usagePercentages,
        isLoading
    }
}