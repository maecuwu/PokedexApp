import { useState, useEffect } from 'react';


export const useDebounce = (input: string = '', time: number = 400) => {

    const [debounceValue, setDebounceValue] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebounceValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        }

    }, [input])




    return {
        debounceValue
    }
}