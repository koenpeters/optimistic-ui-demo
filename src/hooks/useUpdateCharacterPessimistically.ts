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
      onSettled: () => {
        queryClient.invalidateQueries([USE_CHARACTER_QUERY_KEY]);
      },
    },
  );
};