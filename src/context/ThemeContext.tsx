import { createContext, useReducer } from 'react'
import { Appearance } from 'react-native';

import { ThemeState, darkTheme, lightTheme, themeReducer } from './themeReducer';


export interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {

    const [theme, dispatch] = useReducer(themeReducer,
        (Appearance.getColorScheme() === 'dark') ? darkTheme : lightTheme);


    const setDarkTheme = () => {
        dispatch({ type: 'set_dark_theme' })
    }

    const setLightTheme = () => {
        dispatch({ type: 'set_light_theme' })
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