import { createContext, useReducer } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { PokemonTeam, SimplePokemon } from '../interfaces/pokemonInterfaces';
import { pokemonTeamReducer } from './pokemonTeamReducer';



// Estado inicial
export const pokemonTeamInitialSate: PokemonTeam = {
    name: '',
    pokemons: []
}


// Para decirle a React como es y que expone el context
type PokemonTeamContextProps = {
    PokemonTeam: PokemonTeam;
    addPokemon: (pokemon: SimplePokemon) => boolean;
    changeTeamName: (newName: string) => void;
    changeTeamPokemons: (pokemons: SimplePokemon[]) => void;
    editPokemon: (index: number, pokemon: SimplePokemon) => void;
    deletePokemon: (index: number) => void;
    saveTeam: () => void;
    deleteTeam: (teamName: string) => void;
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

    const changeTeamName = (newName: string) => {
        dispatch({ type: 'changeTeamName', payload: newName })
    }

    const changeTeamPokemons = (pokemons: SimplePokemon[]) => {
        dispatch({ type: 'changeTeamPokemons', payload: pokemons })
    }

    const editPokemon = async (index: number, pokemon: SimplePokemon) => {
        dispatch({
            type: 'editPokemon', payload: {
                index,
                pokemon
            }
        })
        await AsyncStorage.mergeItem(state.name, JSON.stringify(state));
    }

    const deletePokemon = async (index: number) => {
        dispatch({
            type: 'deletePokemon',
            payload: index
        })
        await saveTeam();
    }

    const saveTeam = async () => {

        if (state.name.length > 0) {
            await AsyncStorage.setItem('team-' + state.name, JSON.stringify(state));
        }
        else {
            await AsyncStorage.setItem('team-Equipo sin nombre', JSON.stringify(state));
        }
    }

    const deleteTeam = async (teamName: string) => {
        try {
            await AsyncStorage.removeItem(teamName);         
        } catch (error) {
            console.log('Error borrando' + error);
        }
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

        let keys: readonly string[] = [];
        let teams: string[] = [];

        try {

            keys = await AsyncStorage.getAllKeys();

            keys.forEach(k => {
                if (k.startsWith('team')) teams.push(k);
            });

            return teams;

        } catch (error) {
            console.log({ error })
            return;
        }

    }


    return (
        <PokemonTeamContext.Provider value={{
            PokemonTeam: state,
            addPokemon,
            changeTeamName,
            changeTeamPokemons,
            editPokemon,
            deletePokemon,
            saveTeam,
            deleteTeam,
            getTeam,
            getAllTeams
        }}>
            {children}
        </PokemonTeamContext.Provider>
    )
}