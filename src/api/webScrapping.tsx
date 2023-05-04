import axios from 'axios'



const baseURL = 'https://www.pikalytics.com/pokedex/gen9vgc2023series2bochumregionals';

export const webScrapping = axios.get(baseURL);