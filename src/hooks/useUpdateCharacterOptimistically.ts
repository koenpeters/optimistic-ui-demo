import { CharactersService, type Character} from "@/apiClient";
import { useMutation, useQueryClient } from "vue-query";
import { USE_CHARACTER_QUERY_KEY } from "./shared";
  
export const useUpdateCharacter = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (character: Character) => {
      if (character.id === undefined) return;
      return CharactersService.updateCharacterById({ id: character.id, requestBody: character});
    },
    {
      onMutate: async (newCharacter) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([USE_CHARACTER_QUERY_KEY]);

        // Snapshot the previous value
        const previousValue: Character[] | undefined = queryClient.getQueryData([USE_CHARACTER_QUERY_KEY]);

        // Optimistically update to the new value
        queryClient.setQueryData([USE_CHARACTER_QUERY_KEY], () => {
          if (!previousValue) return undefined;

          const index = previousValue.findIndex((pv) => pv.id === newCharacter.id);
          if (index === -1) return previousValue;

          const optimistic = JSON.parse(JSON.stringify(previousValue));
          optimistic[index] = newCharacter;
          return optimistic;
        });

        // Return a context object with the snapshotted value
        return { previousValue };
      },

      onError: (err, newCharacter, context) => {
        queryClient.setQueryData([USE_CHARACTER_QUERY_KEY], context?.previousValue);
        console.error(err);
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([USE_CHARACTER_QUERY_KEY]);
      },
    },
  );
};