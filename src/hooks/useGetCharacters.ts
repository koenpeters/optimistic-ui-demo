import { CharactersService } from "@/apiClient";
import { useQuery } from "vue-query";
import { USE_CHARACTER_QUERY_KEY } from "./shared";

export function useGetCharacters() {
  return useQuery([USE_CHARACTER_QUERY_KEY], async () => {
    return await CharactersService.getCharacters().then((data) => data);
  });
}