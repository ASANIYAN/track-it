import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFunction,
  MutationFunction,
} from "@tanstack/react-query";

export const useRequestProcessor = () => {
  const queryClient = useQueryClient();

  const Query = (
    key: any,
    queryFunction: QueryFunction<unknown, any, never> | undefined,
    options = {}
  ) => {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  };

  const Mutate = (
    key: any,
    mutationFunction: MutationFunction<unknown, void> | undefined,
    options = {}
  ) => {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  };

  return { Query, Mutate };
};
