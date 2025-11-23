import React from "react";

interface EnrollmentControlsProps {
  enrollmentOpen: boolean;
  hasParticipants: boolean;
  onClose: () => void;
  onReopen: () => void;
}

const EnrollmentControls: React.FC<EnrollmentControlsProps> = ({
  enrollmentOpen,
  hasParticipants,
  onClose,
  onReopen,
}) => {
  return (
    <div className="card-soft">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
          🎄 Stato iscrizioni
        </h2>
        <span className={enrollmentOpen ? "pill-open" : "pill-closed"}>
          <span className="flex h-1.5 w-1.5 rounded-full bg-current" />
          {enrollmentOpen ? "Iscrizioni aperte" : "Iscrizioni chiuse"}
        </span>
      </div>

      {enrollmentOpen ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
            disabled={!hasParticipants}
            title={
              hasParticipants
                ? "Chiudi definitivamente le iscrizioni"
                : "Aggiungi almeno un partecipante per chiudere"
            }
          >
            🔒 Chiudi iscrizioni
          </button>
          {!hasParticipants && (
            <span className="text-[11px] text-slate-300">
              Devi avere almeno un partecipante per chiudere le iscrizioni.
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn-secondary"
            onClick={onReopen}
            title="Solo per test: riapre le iscrizioni e resetta estrazioni/abbinamenti."
          >
            🔁 Riapri iscrizioni (debug)
          </button>
          <span className="text-[11px] text-slate-400">
            In produzione puoi rimuovere questo pulsante.
          </span>
        </div>
      )}
    </div>
  );
};

export default EnrollmentControls;