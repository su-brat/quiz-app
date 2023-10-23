import { writable } from "svelte/store";

export interface Answer {
  id: number;
  isCorrect: boolean | null;
  optionSelected: string | null;
}

export const answers = writable<Answer[]>([]);