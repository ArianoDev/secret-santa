import React from "react";
import { Participant } from "../types";

interface ParticipantsListProps {
  participants: Participant[];
  canEdit: boolean;
  onRemove: (id: string) => void;
}

const modeLabel = (m: string) =>
  m === "A" ? "Estrazione in anticipo" : "Estrazione il giorno dello scambio";

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  canEdit,
  onRemove,
}) => {
  return (
    <div className="card mt-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          🧑‍🎄 Partecipanti iscritti
        </h2>
        <span className="text-xs text-amber-200 bg-amber-900/40 border border-amber-400/60 rounded-full px-2 py-0.5 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {participants.length} iscritt{participants.length === 1 ? "o" : "i"}
        </span>
      </div>

      {participants.length === 0 ? (
        <p className="text-xs text-slate-300">
          Nessun partecipante ancora iscritto. Inizia aggiungendo qualcuno 🎁
        </p>
      ) : (
        <div className="mt-2 rounded-xl border border-slate-800/80 overflow-hidden">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-slate-900/90">
              <tr className="text-slate-200">
                <th className="px-3 py-2 text-left w-10">#</th>
                <th className="px-3 py-2 text-left">Nome</th>
                <th className="px-3 py-2 text-left">Cognome</th>
                <th className="px-3 py-2 text-left">Modalità preferita</th>
                <th className="px-3 py-2 text-right w-20"></th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, idx) => (
                <tr
                  key={p.id}
                  className={
                    idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-950/40"
                  }
                >
                  <td className="px-3 py-2 text-slate-300">{idx + 1}</td>
                  <td className="px-3 py-2 text-slate-100">{p.firstName}</td>
                  <td className="px-3 py-2 text-slate-100">{p.lastName}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${
                        p.preferredMode === "A"
                          ? "bg-emerald-900/50 text-emerald-200 border border-emerald-500/50"
                          : "bg-red-900/60 text-red-100 border border-red-500/70"
                      }`}
                    >
                      {p.preferredMode === "A" ? "🎁 A" : "🎄 B"}{" "}
                      <span className="hidden sm:inline">
                        {modeLabel(p.preferredMode)}
                      </span>
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      disabled={!canEdit}
                      onClick={() => onRemove(p.id)}
                      className="btn-danger"
                    >
                      Rimuovi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!canEdit && (
        <p className="mt-2 text-[11px] text-slate-400">
          Le iscrizioni sono chiuse: non è più possibile modificare l&apos;elenco.
        </p>
      )}
    </div>
  );
};

export default ParticipantsList;