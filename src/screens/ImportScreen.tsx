import { StackScreenProps } from '@react-navigation/stack';
import { Koffing } from 'koffing';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TeamsRootStackParams } from '../navigator/TeamsStackNavigator';




interface Props extends StackScreenProps<TeamsRootStackParams, 'ImportScreen'> { };

export const ImportScreen = ({navigation, route}: Props) => {

    const importMode = route.params.importMode;

    const showdownExampleCode = `
    === [gen7] Folder 1/Example Team ===

    Smogon (Koffing) (F) @ Eviolite
    Level: 5
    Ability: Levitate
    Shiny: Yes
    Happiness: 255
    EVs: 36 HP / 236 Def / 236 SpD
    IVs: 31 HP / 30 Atk / 31 SpA / 30 SpD / 31 Spe
    Bold Nature
    - Will-O-Wisp
    - Pain Split
    - Sludge Bomb
    - Fire Blast
    
    Weezing @ Black Sludge
    Ability: Levitate
    EVs: 252 HP / 160 Def / 96 Spe
    Bold Nature
    - Sludge Bomb
    - Will-O-Wisp
    - Toxic Spikes
    - Taunt`

    const parsedTeam = JSON.parse(Koffing.parse(showdownExampleCode).toJson());
    console.log(parsedTeam.teams[0].pokemon);


    return (
        <ScrollView style={{ flex: 1 }}>
            <Text> ImportScreen </Text>
        </ScrollView>
    )
}