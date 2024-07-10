import { useMutation } from '@tanstack/react-query';

export const useMutationHooks = (Callback) => {
    const mutation = useMutation({
        mutationFn: Callback,
    });
    return mutation;
};
