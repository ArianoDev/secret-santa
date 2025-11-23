import React, { useState } from "react";
import { GameMode } from "../types";

interface ParticipantsFormProps {
  onAdd: (data: { firstName: string; lastName: string; preferredMode: GameMode }) => void;
  disabled: boolean;
}

const ParticipantsForm: React.FC<ParticipantsFormProps> = ({ onAdd, disabled }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredMode, setPreferredMode] = useState<GameMode | "">("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    const newErrors: string[] = [];
    if (!firstName.trim()) newErrors.push("Il nome è obbligatorio, mica posso indovinarlo.");
    if (!lastName.trim()) newErrors.push("Il cognome è obbligatorio, sennò pare una lista de Pokémon.");
    if (!preferredMode) newErrors.push("Seleziona una modalità di gioco.");

    setErrors(newErrors);
    if (newErrors.length > 0) return;

    onAdd({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      preferredMode: preferredMode as GameMode,
    });

    setFirstName("");
    setLastName("");
    setPreferredMode("");
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-1.5">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          🎅 Iscrizione partecipanti
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900/50 border border-emerald-500/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-emerald-200">
          Step 1
        </span>
      </div>
      <p className="text-xs text-slate-300 mb-3">
        Iscriviti lasciando nome, cognome (veri non il nickname di Twich) e la modalità preferita.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 items-end"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wide text-slate-300">
            Nome
          </label>
          <input
            type="text"
            value={firstName}
            disabled={disabled}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Mario"
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wide text-slate-300">
            Cognome
          </label>
          <input
            type="text"
            value={lastName}
            disabled={disabled}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Rossi"
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wide text-slate-300">
            Modalità preferita
          </label>
          <div className="flex flex-col gap-1.5 text-xs text-slate-200">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="A"
                disabled={disabled}
                checked={preferredMode === "A"}
                onChange={() => setPreferredMode("A")}
                className="h-4 w-4 accent-emerald-400"
              />
              <span>
                Estrazione in anticipo{" "}
                <span className="text-[10px] text-amber-300 ml-1 bg-amber-900/40 px-1.5 py-0.5 rounded-full">
                  Modalità A
                </span>
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="B"
                disabled={disabled}
                checked={preferredMode === "B"}
                onChange={() => setPreferredMode("B")}
                className="h-4 w-4 accent-red-400"
              />
              <span>
                Estrazione il giorno dello scambio{" "}
                <span className="text-[10px] text-red-200 ml-1 bg-red-900/50 px-1.5 py-0.5 rounded-full">
                  Modalità B
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center md:col-span-2 lg:col-span-3">
          <button type="submit" disabled={disabled} className="btn-primary">
            + Aggiungi partecipante
          </button>
        </div>
      </form>

      {errors.length > 0 && (
        <div className="mt-3 rounded-xl border border-red-500/60 bg-red-950/50 px-3 py-2 text-xs text-red-100 space-y-1">
          {errors.map((err, idx) => (
            <p key={idx}>• {err}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipantsForm;