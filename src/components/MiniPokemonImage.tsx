import { Image } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { PokemonTeamContext } from '../context/PokemonTeamContext';
import { PokemonTeam } from '../interfaces/pokemonInterfaces';


interface Props {
    teamName: string;
}

export const MiniPokemonImage = ({ teamName }: Props) => {

    const { getTeam } = useContext(PokemonTeamContext);

    const [team, setTeam] = useState<PokemonTeam>();



    useEffect(() => {
        loadTeam();
    }, [])

    const loadTeam = async () => {
        const team = await getTeam(teamName);
        setTeam(team);
    }



    return (
        <>
            {
                team?.pokemons.map(({ picture, name }, index) => (
                    <Image
                        source={{ uri: picture }}
                        key={name + index}
                        style={{ width: 50, height: 60 }}
                    />
                ))
            }
        </>
    )
}