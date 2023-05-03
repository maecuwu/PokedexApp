import { Theme } from "@react-navigation/native"


type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }


export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark';
    tabBarColor: string;
}

// AUN SIN DISEÑAR EL TEMA LIGHT

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    colors: {
        primary: 'white',
        background: 'white',
        card: '',
        text: 'black',
        border: 'black',
        notification: '',
    },
    tabBarColor: 'rgba(255, 255, 255, 0.85)',
}

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    colors: {
        primary: 'black',
        background: '#222222',
        card: '',
        text: 'white',
        border: 'rgba(40, 40, 40, 0.85)',
        notification: '',
    },
    tabBarColor: 'rgba(40, 40, 40, 0.85)',
}



export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case 'set_light_theme':
            return { ...lightTheme }
        case 'set_dark_theme':
            return { ...darkTheme }

        default:
            return state
    }
}