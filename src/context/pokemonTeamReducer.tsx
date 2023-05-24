import { PokemonTeam, SimplePokemon } from "../interfaces/pokemonInterfaces";


type PokemonTeamAction =
    | { type: 'addPokemon', payload: SimplePokemon }
    | { type: 'changeTeamName', payload: string }
    | { type: 'changeTeamPokemons', payload: SimplePokemon[] }
    | { type: 'editPokemon', payload: { index: number, pokemon: SimplePokemon } }
    | { type: 'deletePokemon', payload: number }


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
        case 'editPokemon':
            return {
                ...state,
                // Solucion mas cutre que cutrix ideal seria .map
                pokemons: [
                    ...state.pokemons.slice(0, action.payload.index),
                    {
                        name: action.payload.pokemon.name,
                        id: action.payload.pokemon.id,
                        picture: action.payload.pokemon.picture,
                        color: action.payload.pokemon.color
                    },
                    ...state.pokemons.slice(action.payload.index + 1)
                ]
            }
        case 'deletePokemon':
            return {
                ...state,
                pokemons: state.pokemons.splice(action.payload, 1)
            }

        default:
            return state;
    }
}