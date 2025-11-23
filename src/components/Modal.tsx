import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div id="mymodal" className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl bg-slate-950/95 border border-blueSpruce/70 shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-800/70">
          <h2 className="text-sm font-semibold tracking-tight text-brightSnow">
            {title ?? "Aggiungi partecipante"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs text-brightSnow hover:bg-slate-800 transition-colors"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto max-h-[72vh]">
          {children}
        </div>

        {/* Footer “ombra” */}
        <div className="h-3 bg-gradient-to-t from-slate-950/90 to-transparent" />
      </div>
    </div>
  );
};

export default Modal;