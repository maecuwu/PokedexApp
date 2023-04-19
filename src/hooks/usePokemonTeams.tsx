import { useState } from 'react';
import { PokemonTeam } from '../interfaces/pokemonInterfaces';


export const usePokemonTeams = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [pokemonTeam, setPokemonTeam] = useState<PokemonTeam>();
    
    return {
        pokemonTeam,
        isLoading
    }

}