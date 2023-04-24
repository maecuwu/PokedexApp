import { SimplePokemon } from "../interfaces/pokemonInterfaces";
import { PokemonTeamState } from "./PokemonTeamContext";


type PokemonTeamAction =
    | { type: 'addPokemon', payload: SimplePokemon }
    | { type: 'changeTeamName', payload: string }


export const pokemonTeamReducer = (state: PokemonTeamState, action: PokemonTeamAction): PokemonTeamState => {

    switch (action.type) {
        case 'addPokemon':
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case 'changeTeamName':
            return {
                ...state,
                name: action.payload
            }
    }
}