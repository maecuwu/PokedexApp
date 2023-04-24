import { createContext, useReducer } from 'react'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { pokemonTeamReducer } from './pokemonTeamReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Definir el contexto
export interface PokemonTeamState {
    name: string;
    pokemons: SimplePokemon[];
}


// Estado inicial
export const pokemonTeamInitialSate: PokemonTeamState = {
    name: 'Equipo sin nombre',
    pokemons: []
}


// Para decirle a React como es y que expone el context
type PokemonTeamContextProps = {
    PokemonTeamState: PokemonTeamState;
    addPokemon: (pokemon: SimplePokemon) => boolean;
    removePokemon: () => void;
    changeTeamName: (newName: string) => void;
    editPokemon: () => void;
}


// Crear el contexto
export const PokemonTeamContext = createContext({} as PokemonTeamContextProps);


// Proveedor del estado
export const PokemonTeamProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(pokemonTeamReducer, pokemonTeamInitialSate);



    const addPokemon = (pokemon: SimplePokemon) => {

        if (state.pokemons.length < 6) {
            dispatch({ type: 'addPokemon', payload: pokemon })

            AsyncStorage.setItem(state.name, JSON.stringify(state));

            return true;
        }

        return false;
    }

    const removePokemon = () => {

    }

    const changeTeamName = (newName: string) => {
        dispatch({ type: 'changeTeamName', payload: newName })
    }

    const editPokemon = () => {

    }


    return (
        <PokemonTeamContext.Provider value={{
            PokemonTeamState: state,
            addPokemon,
            removePokemon,
            changeTeamName,
            editPokemon
        }}>
            {children}
        </PokemonTeamContext.Provider>
    )
}