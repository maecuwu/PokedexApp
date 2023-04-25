import { createContext, useReducer } from 'react'
import { PokemonTeam, SimplePokemon } from '../interfaces/pokemonInterfaces';
import { pokemonTeamReducer } from './pokemonTeamReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Estado inicial
export const pokemonTeamInitialSate: PokemonTeam = {
    name: 'Equipo sin nombre',
    pokemons: []
}


// Para decirle a React como es y que expone el context
type PokemonTeamContextProps = {
    PokemonTeamState: PokemonTeam;
    addPokemon: (pokemon: SimplePokemon) => boolean;
    removePokemon: () => void;
    changeTeamName: (newName: string) => void;
    editPokemon: () => void;
    saveTeam: () => void;
    getTeam: (teamName: string) => Promise<PokemonTeam>;
    getAllTeams: () => Promise<string[] | undefined>;
}


// Crear el contexto
export const PokemonTeamContext = createContext({} as PokemonTeamContextProps);


// Proveedor del estado
export const PokemonTeamProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(pokemonTeamReducer, pokemonTeamInitialSate);

    const addPokemon = (pokemon: SimplePokemon) => {

        if (state.pokemons.length < 6) {
            dispatch({ type: 'addPokemon', payload: pokemon })
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

    const saveTeam = async () => {
        await AsyncStorage.setItem(state.name, JSON.stringify(state));
    }

    const getTeam = async (teamName: string) => {
        try {
            const value = await AsyncStorage.getItem(teamName)
            if (value !== null) {
                return JSON.parse(value);
            }
            return;
        } catch (error) {
            console.log({ error })
        }
    }

    const getAllTeams = async () => {

        let keys: readonly string[] = []

        try {

            keys = await AsyncStorage.getAllKeys()
            return Array.from(keys);

        } catch (error) {
            console.log({ error })
            return;
        }

    }


    return (
        <PokemonTeamContext.Provider value={{
            PokemonTeamState: state,
            addPokemon,
            removePokemon,
            changeTeamName,
            editPokemon,
            saveTeam,
            getTeam,
            getAllTeams
        }}>
            {children}
        </PokemonTeamContext.Provider>
    )
}