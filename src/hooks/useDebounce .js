import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


export const useDeBounce = (value , delay) => {
    const [valueDebounce , setValueDebounce] = useState('')  
    useEffect(() => {
        const handle = setTimeout(() => {
        setValueDebounce(value)
    } ,[delay] )
    return () => {
        clearTimeout(handle)
    }
    }, [value])
    
    return valueDebounce
}

