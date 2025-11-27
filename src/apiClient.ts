// src/apiClient.ts
import { Assignment, GameMode, Participant } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {
      // ignore json parse errors
    }
    throw new Error(msg);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

/** HEALTHCHECK **/

export type BackendHealth = {
  status: string;
  message?: string;
  db?: string;
};

export async function apiGetHealth(): Promise<BackendHealth> {
  return request<BackendHealth>("/api/health");
}

export async function apiGetDbHealth(): Promise<BackendHealth> {
  return request<BackendHealth>("/api/health/db");
}

/** PARTICIPANTS **/

type ApiParticipant = {
  id: string;
  first_name: string;
  last_name: string;
  preferred_mode: GameMode;
  created_at: string;
};

export async function apiGetParticipants(): Promise<Participant[]> {
  const data = await request<ApiParticipant[]>("/api/participants");
  return data.map((p) => ({
    id: p.id,
    firstName: p.first_name,
    lastName: p.last_name,
    preferredMode: p.preferred_mode,
  }));
}

export async function apiAddParticipant(input: {
  firstName: string;
  lastName: string;
  preferredMode: GameMode;
}): Promise<Participant> {
  const body = {
    firstName: input.firstName,
    lastName: input.lastName,
    preferredMode: input.preferredMode,
  };

  const p = await request<ApiParticipant>("/api/participants", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return {
    id: p.id,
    firstName: p.first_name,
    lastName: p.last_name,
    preferredMode: p.preferred_mode,
  };
}

export async function apiDeleteParticipant(id: string): Promise<void> {
  await request<void>(`/api/participants/${id}`, {
    method: "DELETE",
  });
}

/** DRAWS - Modalità B **/

type ApiDrawB = {
  id: number;
  participant_id: string;
  draw_order: number;
  created_at: string;
};

export type DrawBEntry = {
  id: number;
  participantId: string;
  drawOrder: number;
  createdAt: string;
};

export async function apiGetDrawsB(): Promise<DrawBEntry[]> {
  const data = await request<ApiDrawB[]>("/api/draws/b");
  return data.map((d) => ({
    id: d.id,
    participantId: d.participant_id,
    drawOrder: d.draw_order,
    createdAt: d.created_at,
  }));
}

type ApiDrawNextResponse = {
  draw: ApiDrawB;
  participant: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

export async function apiDrawNextB(): Promise<DrawBEntry> {
  const data = await request<ApiDrawNextResponse>("/api/draws/b/next", {
    method: "POST",
  });

  const d = data.draw;
  return {
    id: d.id,
    participantId: d.participant_id,
    drawOrder: d.draw_order,
    createdAt: d.created_at,
  };
}

/** ASSIGNMENTS - Modalità A **/

type ApiAssignmentA = {
  id: number;
  giver_id: string;
  receiver_id: string;
  created_at: string;
};

export async function apiGetAssignmentsA(): Promise<Assignment[]> {
  const data = await request<ApiAssignmentA[]>("/api/assignments/a");
  return data.map((a) => ({
    giverId: a.giver_id,
    receiverId: a.receiver_id,
  }));
}

export async function apiGenerateAssignmentsA(): Promise<Assignment[]> {
  const data = await request<ApiAssignmentA[]>("/api/assignments/a/generate", {
    method: "POST",
  });
  return data.map((a) => ({
    giverId: a.giver_id,
    receiverId: a.receiver_id,
  }));
}