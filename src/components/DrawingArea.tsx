import React from "react";
import { DrawStateB, Participant } from "../types";

interface DrawingAreaProps {
  participants: Participant[];
  drawState: DrawStateB;
  onDrawNext: () => void;
}

const DrawingArea: React.FC<DrawingAreaProps> = ({
  participants,
  drawState,
  onDrawNext,
}) => {
  const total = participants.length;
  const drawnCount = drawState.drawnIds.length;
  const allDrawn = drawnCount >= total && total > 0;

  const lastDrawnParticipant =
    drawState.drawnIds.length > 0
      ? participants.find(
          (p) => p.id === drawState.drawnIds[drawState.drawnIds.length - 1]
        )
      : undefined;

  return (
    <div className="card mt-4">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          🎁 Modalità B: giorno dello scambio
        </h2>
        <span className="text-[11px] text-slate-300">
          Tipo roulette russa ma coi regali
        </span>
      </div>
      <p className="text-xs text-slate-300 mb-3">
        Premi il pulsante e pregamo insieme che non esca quello che fa i regali riciclati dal 2009.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          className="btn-primary"
          onClick={onDrawNext}
          disabled={allDrawn || total === 0}
        >
          🎄 Estrai prossimo partecipante
        </button>
        <p className="text-[11px] text-slate-300">
          Estratti:{" "}
          <span className="font-semibold text-emerald-300">
            {drawnCount} / {total}
          </span>
        </p>
      </div>

      {total === 0 && (
        <p className="text-xs text-red-200 bg-red-900/40 border border-red-500/60 rounded-xl px-3 py-2">
          Non ci sono partecipanti. Aggiungili prima di procedere all&apos;estrazione.
        </p>
      )}

      {lastDrawnParticipant && (
        <div className="mt-3 rounded-xl border border-emerald-500/60 bg-emerald-900/40 px-4 py-3">
          <h3 className="text-sm font-semibold text-emerald-100 flex items-center gap-2">
            ✨ Ultimo estratto
          </h3>
          <p className="mt-1 text-base font-semibold text-emerald-50">
            {lastDrawnParticipant.firstName} {lastDrawnParticipant.lastName}
          </p>
        </div>
      )}

      {drawState.drawnIds.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-slate-200 mb-1">
            Lista dei partecipanti già estratti (in ordine):
          </h3>
          <ol className="text-xs text-slate-200 list-decimal list-inside bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-2 max-h-40 overflow-auto">
            {drawState.drawnIds.map((id) => {
              const p = participants.find((x) => x.id === id);
              if (!p) return null;
              return (
                <li key={id} className="py-0.5">
                  {p.firstName} {p.lastName}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {allDrawn && (
        <p className="mt-3 text-xs text-emerald-200 bg-emerald-900/40 border border-emerald-500/60 rounded-xl px-3 py-2">
          Tutti i partecipanti hanno estratto il proprio regalo. 🎄🎁
        </p>
      )}
    </div>
  );
};

export default DrawingArea;