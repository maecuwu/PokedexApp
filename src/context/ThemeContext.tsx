import { createContext, useEffect, useReducer } from 'react'
import { Appearance, AppState } from 'react-native';

import { ThemeState, darkTheme, lightTheme, themeReducer } from './themeReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {

    const [theme, dispatch] = useReducer(themeReducer,
        (Appearance.getColorScheme() === 'dark') ? darkTheme : lightTheme);



    AsyncStorage.setItem('currentTheme', theme.currentTheme);


    const setDarkTheme = async () => {
        dispatch({ type: 'set_dark_theme' })
        await AsyncStorage.setItem('currentTheme', theme.currentTheme);
    }

    const setLightTheme = async () => {
        dispatch({ type: 'set_light_theme' })
        await AsyncStorage.setItem('currentTheme', theme.currentTheme);
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