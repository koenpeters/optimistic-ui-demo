import { setupWorker } from "msw/browser";
import { http, HttpResponse, delay } from "msw";
import characters from "./stubs/seinfeld-characters";
import type { Character } from "@/apiClient";

const delayTime = 2000;

const handlers = [
  http.get("/api/characters", async () => {
    await delay(delayTime);
    return HttpResponse.json(characters);
  }),
  http.put("/api/characters/:key", async ({ request }) => {
    await delay(delayTime);
    const character = (await request.json()) as Character;
    
    const index = characters.findIndex((c) => c.id === character.id);
    if (index !== -1) {
      characters[index] = character;
    }
    return new HttpResponse(null, { status: 204 });
  }),
];

export const worker = setupWorker(...handlers);
