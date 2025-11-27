import React, { useEffect, useMemo, useState } from "react";
import {
  Assignment,
  DrawStateB,
  GameMode,
  Participant,
} from "./types";

import ParticipantsForm from "./components/ParticipantsForm";
import ParticipantsList from "./components/ParticipantsList";
import EnrollmentControls from "./components/EnrollmentControls";
import DrawingArea from "./components/DrawingArea";
import AdvanceDrawArea from "./components/AdvanceDrawArea";
import Hero from "./components/Hero";
import Modal from "./components/Modal";

import {
  apiAddParticipant,
  apiDeleteParticipant,
  apiDrawNextB,
  apiGenerateAssignmentsA,
  apiGetAssignmentsA,
  apiGetDrawsB,
  apiGetParticipants,
  DrawBEntry,
} from "./apiClient";

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [drawsB, setDrawsB] = useState<DrawBEntry[]>([]);
  const [assignmentsA, setAssignmentsA] = useState<Assignment[] | null>(null);

  const [enrollmentOpen, setEnrollmentOpen] = useState<boolean>(true);

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const [loadingAll, setLoadingAll] = useState<boolean>(true);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // ---- Helper di caricamento ----

  const loadParticipants = async () => {
    const data = await apiGetParticipants();
    setParticipants(data);
  };

  const loadDraws = async () => {
    const data = await apiGetDrawsB();
    setDrawsB(data);
  };

  const loadAssignments = async () => {
    const data = await apiGetAssignmentsA();
    setAssignmentsA(data.length > 0 ? data : null);
  };

  const loadAll = async () => {
    setLoadingAll(true);
    setGlobalError(null);
    try {
      await Promise.all([loadParticipants(), loadDraws(), loadAssignments()]);
    } catch (err: any) {
      console.error(err);
      setGlobalError(err.message || "Errore nel caricare i dati dal backend.");
    } finally {
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    // all'avvio, carica tutto dal backend
    void loadAll();
  }, []);

  // ---- Azioni ----

  const handleAddParticipant = async (data: {
    firstName: string;
    lastName: string;
    preferredMode: GameMode;
  }) => {
    setLoadingAction(true);
    setGlobalError(null);
    try {
      await apiAddParticipant(data);
      await loadAll(); // ricarica tutto (partecipanti, draws, assignments)
    } catch (err: any) {
      console.error(err);
      setGlobalError(err.message || "Errore nell'aggiunta partecipante.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemoveParticipant = async (id: string) => {
    setLoadingAction(true);
    setGlobalError(null);
    try {
      await apiDeleteParticipant(id);
      await loadAll();
    } catch (err: any) {
      console.error(err);
      setGlobalError(err.message || "Errore nella rimozione partecipante.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleCloseEnrollment = () => {
    setEnrollmentOpen(false);
    // Nota: stato solo frontend; se vuoi
    // potresti persisterlo su backend o localStorage
  };

  const handleReopenEnrollment = () => {
    setEnrollmentOpen(true);
    // opzionale: potresti anche voler resettare draws/assignments lato backend
  };

  const handleDrawNextB = async () => {
    setLoadingAction(true);
    setGlobalError(null);
    try {
      await apiDrawNextB();
      await loadDraws();
    } catch (err: any) {
      console.error(err);
      setGlobalError(
        err.message || "Errore durante l'estrazione del prossimo partecipante."
      );
    } finally {
      setLoadingAction(false);
    }
  };

  const handleGenerateAssignmentsA = async () => {
    setLoadingAction(true);
    setGlobalError(null);
    try {
      const data = await apiGenerateAssignmentsA();
      setAssignmentsA(data);
    } catch (err: any) {
      console.error(err);
      setGlobalError(
        err.message || "Errore durante la generazione degli abbinamenti."
      );
    } finally {
      setLoadingAction(false);
    }
  };

  // Deriva DrawStateB dalla lista delle estrazioni
  const drawStateB: DrawStateB = useMemo(
    () => ({
      drawnIds: drawsB.map((d) => d.participantId),
    }),
    [drawsB]
  );

  const participantsWithPreferenceA = useMemo(
    () => participants.filter((p) => p.preferredMode === "A").length,
    [participants]
  );

  const participantsWithPreferenceB = useMemo(
    () => participants.filter((p) => p.preferredMode === "B").length,
    [participants]
  );

  const isBusy = loadingAll || loadingAction;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* HERO */}
        <Hero onOpenEnroll={() => setIsEnrollModalOpen(true)} />

        {/* MODALE ISCRIZIONE */}
        <Modal
          isOpen={isEnrollModalOpen && enrollmentOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          title="Iscriviti al Secret Santa"
        >
          <ParticipantsForm
            participants={participants}
            onAdd={handleAddParticipant}
            disabled={!enrollmentOpen || isBusy}
          />
        </Modal>

        {/* Stato globale / errori */}
        {loadingAll && (
          <div className="card-soft text-xs text-brightSnow">
            ⏳ Carico tutto dal backend… (tranquillo, più lento di così solo l’INPS)
          </div>
        )}
        {globalError && (
          <div className="card-soft border-red-500/60 bg-red-950/40 text-xs text-red-100">
            ⚠️ {globalError}
          </div>
        )}

        {/* APP */}
        <main
          id="secret-santa-app"
          className="space-y-4 md:space-y-6 scroll-mt-6"
        >
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start">
            <div>
                <ParticipantsList
                  participants={participants}
                  canEdit={enrollmentOpen && !isBusy}
                  onRemove={handleRemoveParticipant}
                />
            </div>

            <div className="space-y-4 md:space-y-5">
              <EnrollmentControls
                enrollmentOpen={enrollmentOpen}
                hasParticipants={participants.length > 0}
                onClose={handleCloseEnrollment}
                onReopen={handleReopenEnrollment}
              />

              <div className="card-soft">
                <h3 className="text-sm font-semibold tracking-tight mb-1 flex items-center gap-2">
                  📊 Statistiche modalità
                </h3>
                <ul className="text-xs text-brightSnow space-y-1">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-jungleTeal/80 border border-brightSnow/60 text-[10px]">
                        A
                      </span>
                      <span>Estrazione in anticipo → quelli che vivono di ansia strutturale</span>
                    </span>
                    <span className="font-semibold text-brightSnow">
                      {participantsWithPreferenceA}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brickEmber/90 border border-brightSnow/70 text-[10px]">
                        B
                      </span>
                      <span>Estrazione il giorno dello scambio → fatalisti puri</span>
                    </span>
                    <span className="font-semibold text-brightSnow">
                      {participantsWithPreferenceB}
                    </span>
                  </li>
                </ul>
                <p className="mt-2 text-[11px] text-brightSnow/80">
                  Al momento l&apos;estrazione funzionale usa tutti i partecipanti,
                  indipendentemente dalla preferenza. Puoi usare queste statistiche per
                  decidere con il gruppo quale modalità adottare.
                </p>
              </div>

              {!enrollmentOpen && (
                <>
                  <DrawingArea
                    participants={participants}
                    drawState={drawStateB}
                    onDrawNext={handleDrawNextB}
                    disabled={isBusy}
                  />

                  <AdvanceDrawArea
                    participants={participants}
                    assignments={assignmentsA}
                    onGenerateAssignments={handleGenerateAssignmentsA}
                    disabled={isBusy}
                  />
                </>
              )}
            </div>
          </section>
        </main>

        <footer className="mt-2 md:mt-4 text-center">
          <p className="text-[11px] text-brightSnow/80">
            Dati ora salvati su <code className="text-brightSnow">PostgreSQL</code>{" "}
            tramite il backend Node/Express. Il localStorage lo usiamo solo
            nei flashback.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;