import { useMutation } from '@tanstack/react-query';


export const useMutationHook = (fncallback) => {
  const mutation = useMutation(
    {mutationFn: fncallback
    })
    return mutation;    
}


