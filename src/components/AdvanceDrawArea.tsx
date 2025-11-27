import React from "react";
import { Assignment, Participant } from "../types";

interface AdvanceDrawAreaProps {
  participants: Participant[];
  assignments: Assignment[] | null;
  onGenerateAssignments: () => void;
  disabled?: boolean;
}

const AdvanceDrawArea: React.FC<AdvanceDrawAreaProps> = ({
  participants,
  assignments,
  onGenerateAssignments,
  disabled
}) => {
  const hasAssignments = !!assignments && assignments.length > 0;

  const getName = (id: string) => {
    const p = participants.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : "Sconosciuto";
  };

  return (
    <div className="card mt-4">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          🌟 Modalità A: estrazione in anticipo
        </h2>
        <span className="text-[11px] text-slate-300">
          Derangement: nessuno regala a sé stesso
        </span>
      </div>
      <p className="text-xs text-slate-300 mb-3">
        Genera la mappatura evitando che uno regali a sé stesso, che sarebbe tipo il boss finale dell’imbarazzo.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          type="button"
          className="btn-secondary"
          disabled={participants.length < 2}
          onClick={onGenerateAssignments}
          title={
            participants.length < 2
              ? "Servono almeno 2 partecipanti per creare gli abbinamenti"
              : "Genera/rigenera gli abbinamenti"
          }
        >
          🎁 Genera abbinamenti
        </button>
        {participants.length < 2 && (
          <span className="text-[11px] text-slate-400">
            Servono almeno 2 partecipanti per un Secret Santa valido.
          </span>
        )}
      </div>

      {hasAssignments ? (
        <div className="rounded-xl border border-slate-800/80 overflow-hidden">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-slate-900/90 text-slate-200">
              <tr>
                <th className="px-3 py-2 text-left">Donatore</th>
                <th className="px-3 py-2 text-center w-10">(destino crudele)</th>
                <th className="px-3 py-2 text-left">Ricevente</th>
              </tr>
            </thead>
            <tbody>
              {assignments!.map((a, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-950/40"}
                >
                  <td className="px-3 py-2 text-slate-100">{getName(a.giverId)}</td>
                  <td className="px-3 py-2 text-center text-amber-300">→</td>
                  <td className="px-3 py-2 text-slate-100">{getName(a.receiverId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-slate-300">
          Nessun abbinamento ancora generato. Premi{" "}
          <span className="font-semibold text-emerald-300">
            &quot;Genera abbinamenti&quot;
          </span>{" "}
          per creare le coppie.
        </p>
      )}
    </div>
  );
};

export default AdvanceDrawArea;