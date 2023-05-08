import { createContext, useReducer, useEffect } from 'react';
import { Appearance } from 'react-native';

import { ThemeState, darkTheme, lightTheme, themeReducer } from './themeReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';


export interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {

    const [theme, dispatch] = useReducer(themeReducer,
        (Appearance.getColorScheme() === 'dark') ? darkTheme : lightTheme);


    useEffect(() => {
        loadDefaultTheme();
        loadDefaultLanguage();

        AsyncStorage.getItem('theme')
            .then( (value) => {
                if (value === 'dark') setDarkTheme();
                else setLightTheme();
            })
            .catch( (error) => console.log(error));

    }, [])


    
    const loadDefaultLanguage = async() => {

        const lng = await AsyncStorage.getItem('language');

        if (lng == null){
            await AsyncStorage.setItem('language', i18n.language);            
        } else {
            i18n.changeLanguage(lng);
        }

    }
    
    const loadDefaultTheme = async () => {
        if (await AsyncStorage.getItem('theme') == null){
            await AsyncStorage.setItem('theme', (Appearance.getColorScheme() === 'dark') ? 'dark' : 'light');
        }
    }

    const setDarkTheme = async () => {
        dispatch({ type: 'set_dark_theme' });
        await AsyncStorage.setItem('theme', 'dark');
    }

    const setLightTheme = async () => {
        dispatch({ type: 'set_light_theme' });
        await AsyncStorage.setItem('theme', 'light');
    }


    return (
        <ThemeContext.Provider value={{
            theme,
            setDarkTheme,
            setLightTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}