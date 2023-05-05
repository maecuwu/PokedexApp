import { Text, View, ScrollView, Image } from 'react-native';

import { useScrapping } from '../hooks/useScrapping';
import { LoadingComponent } from '../components/LoadingComponent';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { globalStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompetitivePokemon } from '../components/CompetitivePokemon';
import { Spacer } from '../components/Spacer';


export const CompetitiveScreen = () => {

    const { top } = useSafeAreaInsets();

    const { theme: { colors, dark } } = useContext(ThemeContext);

    const { pokemonNames, isLoading, tournamentTitle, usagePercentages } = useScrapping();


    if (isLoading) {
        return <LoadingComponent />
    }

    return (
        <ScrollView contentContainerStyle={{backgroundColor: colors.background}}>

            {
                (dark)
                    ? <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={globalStyles.pokeballBackground}
                    />
                    : <Image
                        source={require('../assets/pokebola.png')}
                        style={globalStyles.pokeballBackground}
                    />
            }

            <View style={{ ...globalStyles.globalMargin, alignItems: 'center' }}>

                <Text style={{
                    ...globalStyles.title,
                    ...globalStyles.globalMargin,
                    color: colors.text,
                    top: top + 20,
                    marginBottom: 20,
                    paddingBottom: 10,
                    fontSize: 22,
                    textAlign: 'center'
                }}>
                    {tournamentTitle}
                </Text>

                {
                    pokemonNames.map((poke, index) => (
                        <CompetitivePokemon
                            pokemonName={poke}
                            pokemonPercentage={usagePercentages[index]}
                            key={poke + index}
                        />
                    ))
                }
            </View>
            <Spacer />
        </ScrollView>
    )
}