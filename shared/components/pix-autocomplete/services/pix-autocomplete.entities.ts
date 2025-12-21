import { InjectionToken, Signal, WritableSignal } from "@angular/core";

export type PixResult = {
  key: string;
  type: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "RANDOM";
  owner: string;
  bank: string;
};
