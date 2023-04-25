import { PokemonTeam, SimplePokemon } from "../interfaces/pokemonInterfaces";


type PokemonTeamAction =
    | { type: 'addPokemon', payload: SimplePokemon }
    | { type: 'changeTeamName', payload: string }
    | { type: 'changeTeamPokemons', payload: SimplePokemon[] }


export const pokemonTeamReducer = (state: PokemonTeam, action: PokemonTeamAction): PokemonTeam => {

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
        case 'changeTeamPokemons':
            return {
                ...state,
                pokemons: action.payload
            }
    }
}