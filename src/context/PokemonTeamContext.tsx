import { createContext, useReducer } from 'react'
import { PokemonTeam, SimplePokemon } from '../interfaces/pokemonInterfaces';
import { pokemonTeamReducer } from './pokemonTeamReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Estado inicial
export const pokemonTeamInitialSate: PokemonTeam = {
    name: '',
    pokemons: []
}


// Para decirle a React como es y que expone el context
type PokemonTeamContextProps = {
    PokemonTeam: PokemonTeam;
    addPokemon: (pokemon: SimplePokemon) => boolean;
    removePokemon: () => void;
    changeTeamName: (newName: string) => void;
    changeTeamPokemons: (pokemons: SimplePokemon[]) => void;
    editPokemon: () => void;
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

    const removePokemon = () => {

    }

    const changeTeamName = (newName: string) => {
        dispatch({ type: 'changeTeamName', payload: newName })
    }

    const changeTeamPokemons = (pokemons: SimplePokemon[]) => {
        dispatch({ type: 'changeTeamPokemons', payload: pokemons })
    }

    const editPokemon = () => {

    }

    const saveTeam = async () => {

        if (state.name.length > 0){
            await AsyncStorage.setItem(state.name, JSON.stringify(state));
        }
        else {
            await AsyncStorage.setItem('Equipo sin nombre', JSON.stringify(state));
        }
    }

    const deleteTeam = async (teamName: string) => {
        await AsyncStorage.removeItem(teamName);
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
            PokemonTeam: state,
            addPokemon,
            removePokemon,
            changeTeamName,
            changeTeamPokemons,
            editPokemon,
            saveTeam,
            deleteTeam,
            getTeam,
            getAllTeams
        }}>
            {children}
        </PokemonTeamContext.Provider>
    )
}