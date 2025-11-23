import React, { useEffect, useMemo, useState } from "react";
import {
  AppStorageState,
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

const STORAGE_KEY = "secret-santa-app-v2";

function loadInitialState(): AppStorageState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        participants: [],
        enrollmentOpen: true,
        drawStateB: { drawnIds: [] },
        assignmentsA: null,
      };
    }
    const parsed = JSON.parse(raw) as AppStorageState;
    return {
      participants: parsed.participants ?? [],
      enrollmentOpen: parsed.enrollmentOpen ?? true,
      drawStateB: parsed.drawStateB ?? { drawnIds: [] },
      assignmentsA: parsed.assignmentsA ?? null,
    };
  } catch {
    return {
      participants: [],
      enrollmentOpen: true,
      drawStateB: { drawnIds: [] },
      assignmentsA: null,
    };
  }
}

function persistState(state: AppStorageState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Genera una derangement (permutazione senza punti fissi) di [0..n-1]
 */
function generateDerangement(n: number): number[] {
  if (n <= 1) return [];

  const indices = Array.from({ length: n }, (_, i) => i);
  const isDerangement = (perm: number[]) =>
    perm.every((val, idx) => val !== idx);

  let attempt = 0;
  while (true) {
    attempt++;
    const perm = [...indices];

    for (let i = perm.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }

    if (isDerangement(perm)) {
      return perm;
    }

    if (attempt > 1000) {
      console.warn("Impossibile generare derangement dopo molti tentativi");
      return perm;
    }
  }
}

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [enrollmentOpen, setEnrollmentOpen] = useState<boolean>(true);
  const [drawStateB, setDrawStateB] = useState<DrawStateB>({ drawnIds: [] });
  const [assignmentsA, setAssignmentsA] = useState<Assignment[] | null>(null);

  useEffect(() => {
    const initial = loadInitialState();
    setParticipants(initial.participants);
    setEnrollmentOpen(initial.enrollmentOpen);
    setDrawStateB(initial.drawStateB);
    setAssignmentsA(initial.assignmentsA);
  }, []);

  useEffect(() => {
    const state: AppStorageState = {
      participants,
      enrollmentOpen,
      drawStateB,
      assignmentsA,
    };
    persistState(state);
  }, [participants, enrollmentOpen, drawStateB, assignmentsA]);

  const handleAddParticipant = (data: {
    firstName: string;
    lastName: string;
    preferredMode: GameMode;
  }) => {
    const newParticipant: Participant = {
      id: generateId(),
      ...data,
    };
    setParticipants((prev) => [...prev, newParticipant]);
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCloseEnrollment = () => {
    setEnrollmentOpen(false);
    setDrawStateB({ drawnIds: [] });
    setAssignmentsA(null);
  };

  const handleReopenEnrollment = () => {
    setEnrollmentOpen(true);
    setDrawStateB({ drawnIds: [] });
    setAssignmentsA(null);
  };

  const handleDrawNextB = () => {
    if (participants.length === 0) return;

    const remaining = participants.filter(
      (p) => !drawStateB.drawnIds.includes(p.id)
    );

    if (remaining.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remaining.length);
    const chosen = remaining[randomIndex];

    setDrawStateB((prev) => ({
      drawnIds: [...prev.drawnIds, chosen.id],
    }));
  };

  const handleGenerateAssignmentsA = () => {
    if (participants.length < 2) return;

    const n = participants.length;
    const derangement = generateDerangement(n);

    const newAssignments: Assignment[] = participants.map((p, idx) => ({
      giverId: p.id,
      receiverId: participants[derangement[idx]].id,
    }));

    setAssignmentsA(newAssignments);
  };

  const participantsWithPreferenceA = useMemo(
    () => participants.filter((p) => p.preferredMode === "A").length,
    [participants]
  );

  const participantsWithPreferenceB = useMemo(
    () => participants.filter((p) => p.preferredMode === "B").length,
    [participants]
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* HERO IN STILE LANDING PAGE */}
        <Hero />

        {/* Contenuto principale della SPA */}
        <main
          id="secret-santa-app"
          className="space-y-4 md:space-y-6 scroll-mt-6"
        >
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start">
            <div>
              <ParticipantsForm
                onAdd={handleAddParticipant}
                disabled={!enrollmentOpen}
              />
              <ParticipantsList
                participants={participants}
                canEdit={enrollmentOpen}
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
                  />

                  <AdvanceDrawArea
                    participants={participants}
                    assignments={assignmentsA}
                    onGenerateAssignments={handleGenerateAssignmentsA}
                  />
                </>
              )}
            </div>
          </section>
        </main>

        {/*
        <footer className="mt-2 md:mt-4 text-center">
          <p className="text-[11px] text-brightSnow/80">
            Dati salvati in <code className="text-brightSnow">localStorage</code>. Per
            azzerare tutto, svuota la cache/localStorage del sito o modifica la chiave{" "}
            <code className="text-brightSnow">STORAGE_KEY</code> in <code>App.tsx</code>.
          </p>
        </footer>
        */}
      </div>
    </div>
  );
};

export default App;