<template>
  <div class="flex justify-center relative w-full h-full m-10">
    <div v-if="isLoading">Loading...</div>  
    <div v-else>
      <table class="text-left">
        <tr class="bg-io-orange-600 text-white">
            <th class="px-2">First name</th>
            <th class="px-2">Last name</th>
            <th class="px-2">Age</th>
            <th class="px-2">First episode</th>
        </tr>
        <tr v-for="character in characters" key="character.id" class="odd:bg-io-orange-200">
            <td class="px-2">{{ character?.first_name }}</td>
            <td class="px-2">{{ character?.last_name }}</td>
            <td class="px-2 flex justify-between gap-2">
                {{ character?.age }}
                <button @click="() => handleClick(character, 1)">+</button>
                <button @click="() => handleClick(character, -1)">-</button>              
            </td>
            <td class="px-2">{{ character?.first_episode }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/apiClient";
import { useGetCharacters } from "@/hooks/useGetCharacters";
import { useUpdateCharacter } from "@/hooks/useUpdateCharacterPessimistically";

const { data: characters, isLoading } = useGetCharacters();
const { mutateAsync: updateCharacter, isLoading: isSaving } = useUpdateCharacter();

function handleClick(character: Character, diff: number) {
  updateCharacter({ ...character, age: character.age + diff });
}
</script>
