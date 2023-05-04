import { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next';

import { PokemonStackNavigator } from './PokemonStackNavigator';
import { SearchScreen } from '../screens/SearchScreen';
import { TeamsStackNavigator } from './TeamsStackNavigator';
import { ThemeContext } from '../context/ThemeContext';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TopTabs } from './TopTabsNavigator';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {

    const { theme: { colors, tabBarColor } } = useContext(ThemeContext);
    const { t } = useTranslation('translation', { keyPrefix: 'tabs' })

    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: colors.background
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: 5,
                    fontSize: 14
                },
                tabBarStyle: {
                    borderWidth: 0,
                    elevation: 0,
                    position: 'absolute',
                    backgroundColor: tabBarColor,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={PokemonStackNavigator}
                options={{
                    tabBarLabel: 'Pokedex',
                    tabBarIcon: (({ color }) => (
                        <Icon color={color} size={25} name='list-outline' />
                    ))
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarLabel: t('searchTab').toString(),
                    tabBarIcon: (({ color }) => (
                        <Icon color={color} size={25} name='search-outline' />
                    ))
                }}
            />
            <Tab.Screen
                name="Teams top tabs"
                component={TopTabs}
                options={{
                    tabBarLabel: t('teamsTab').toString(),
                    tabBarIcon: (({ color }) => (
                        <Icon color={color} size={25} name='layers-outline' />
                    ))
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: t('settingsTab').toString(),
                    tabBarIcon: (({ color }) => (
                        <Icon color={color} size={25} name='settings-outline' />
                    ))
                }}
            />
        </Tab.Navigator>
    );
}