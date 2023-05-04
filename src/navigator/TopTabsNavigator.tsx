import { useContext } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';

import { TeamsStackNavigator } from './TeamsStackNavigator';
import { CompetitiveScreen } from '../screens/CompetitiveScreen';
import { ThemeContext } from '../context/ThemeContext';

const Tab = createMaterialTopTabNavigator();

export const TopTabs = () => {

    const { theme: { colors, tabBarColor } } = useContext(ThemeContext);
    const { t } = useTranslation('translation', { keyPrefix: 'tabs' })

    return (
        <Tab.Navigator
            screenOptions={{                
                tabBarStyle: {
                    elevation: 0,
                    backgroundColor: tabBarColor
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#5856D6'
                },
                tabBarLabelStyle: {
                    color: colors.text,
                    fontSize: 15
                },
                tabBarActiveTintColor: '#5856D6'
            }}
        >
            <Tab.Screen name="Teams" component={TeamsStackNavigator} 
                options={{
                    tabBarLabel: t('myTeamsTab').toString()
                }}
            />
            <Tab.Screen name="CompetitiveScreen" component={CompetitiveScreen} 
                options={{
                    tabBarLabel: t('competitiveTab').toString()
                }}
            />
        </Tab.Navigator>
    );
}