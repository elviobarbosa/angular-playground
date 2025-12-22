import { InjectionToken, Signal, WritableSignal } from "@angular/core";

export type RickAndMortyCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};
export type RickAndMortyResponse = {
  results: RickAndMortyCharacter[];
};

export interface AutocompleteParams {
  status?: "alive" | "dead" | "unknown";
  species?: string;
  gender?: string;
}
