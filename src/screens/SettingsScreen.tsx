import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

import { globalStyles } from '../theme/appTheme';
import { ThemeContext } from '../context/ThemeContext';


export const SettingsScreen = () => {

    const { t } = useTranslation("translation", { keyPrefix: "SettingsScreen" });

    const { theme, setDarkTheme, setLightTheme, theme: { colors, dark } } = useContext(ThemeContext);

    const [selectedLanguage, setSelectedLanguage] = useState<string>();
    const [selectedTheme, setSelectedTheme] = useState<string>();


    const onLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
    }

    const onThemeChange = () => {
        if (theme.currentTheme === 'dark') {
            setSelectedTheme("light");
            setLightTheme();
        } else {
            setSelectedTheme("dark");
            setDarkTheme();
        }
    }

    useEffect(() => {
        setSelectedLanguage(i18n.language);
        setSelectedTheme(theme.currentTheme);
    }, [])


    return (
        <View style={{
            ...globalStyles.globalMargin,
            alignItems: 'center',
            flex: 1
        }}>


            <Text style={{ ...styles.title, color: colors.text }}>
                {t('title')}
            </Text>

            <View style={{ marginTop: 40, width: '100%' }}>
                <Text style={{ ...styles.subtitle, color: colors.text }}>
                    {t('languageTitle')}
                </Text>
                <View style={{...styles.pickerContainer, borderColor: (dark) ? 'grey' : 'black'}}>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue) =>
                            onLanguageChange(itemValue)
                        }
                        mode='dropdown'
                        style={{ ...styles.picker, color: colors.text }}
                        dropdownIconColor={colors.text}
                    >
                        <Picker.Item
                            label={t('english').toString()}
                            value="en"
                            style={{ color: colors.text, backgroundColor: colors.background }}
                        />
                        <Picker.Item
                            label={t('spanish').toString()}
                            value="es"
                            style={{ color: colors.text, backgroundColor: colors.background }}
                        />
                    </Picker>
                </View>
            </View>

            <View style={{ marginTop: 40, width: '100%' }}>
                <Text style={{ ...styles.subtitle, color: colors.text }}>
                    {t('themeTitle')}
                </Text>
                <View style={{...styles.pickerContainer, borderColor: (dark) ? 'grey' : 'black'}}>
                    <Picker
                        selectedValue={selectedTheme}
                        onValueChange={onThemeChange}
                        mode='dropdown'
                        style={{ ...styles.picker, color: colors.text }}
                        dropdownIconColor={colors.text}
                    >
                        <Picker.Item
                            label={t('dark').toString()}
                            value="dark"
                            style={{ color: colors.text, backgroundColor: colors.background }}
                        />
                        <Picker.Item
                            label={t('light').toString()}
                            value="light"
                            style={{ color: colors.text, backgroundColor: colors.background }}
                        />
                    </Picker>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    pickerContainer: {
        marginTop: 10,
        justifyContent: 'center',
        borderWidth: 2,
    },
    picker: {
        fontSize: 15,
        paddingHorizontal: 20,
        marginTop: 5,
    }
});

