// Tipi principali usati nell'app

export type GameMode = "A" | "B"; // A = in anticipo, B = giorno dello scambio

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  preferredMode: GameMode;
}

export interface DrawStateB {
  drawnIds: string[]; // id dei partecipanti già estratti (Modalità B)
}

export interface Assignment {
  giverId: string;
  receiverId: string;
}