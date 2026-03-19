export function createLocalStore<T extends { id?: string; createdAt?: string }>(key: string) {
  function emitChange() {
    window.dispatchEvent(new CustomEvent("localstore:change", { detail: { key } }));
  }

  function load(): T[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function add(item: Omit<T, "id" | "createdAt">) {
    const items = load();
    save([
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...item,
      } as T,
      ...items,
    ]);
  }

  function save(items: T[]) {
    localStorage.setItem(key, JSON.stringify(items));
    emitChange();
  }

  function clear() {
    localStorage.removeItem(key);
    emitChange();
  }

  return { load, add, save, clear };
}

export const sessionStore = createLocalStore<StoredSession>("localsessions");
export const todoStore = createLocalStore<{ id: string; createdAt: string }>("localtodos");

// storage/localStorage.ts  (add below existing code)

import { SessionData, SessionFormData } from "../contexts/sessions/types";

type StoredSession = {
  id: string;
  createdAt: string;
  title: string;
  category: "Arbete" | "Möte" | "Studier" | "";
  mood: number | null;
  comment: string;
  activeTime: number;
  startedAt: string;
  endedAt: string;
};

function storedToSessionData(s: StoredSession): SessionData {
  return {
    session_id: s.id,
    user_id: null,
    title: s.title,
    category: s.category,
    mood: s.mood as SessionData["mood"],
    comment: s.comment,
    active_time_ms: s.activeTime,
    started_at: s.startedAt,
    ended_at: s.endedAt,
    created_at: s.createdAt,
  };
}

function formDataToStored(form: SessionFormData, id: string, createdAt: string): StoredSession {
  return {
    id,
    createdAt,
    title: form.title,
    category: form.category,
    mood: form.mood,
    comment: form.comment,
    activeTime: form.activeTime,
    startedAt: form.startedAt,
    endedAt: form.endedAt,
  };
}

function sessionDataToStored(s: SessionData): StoredSession {
  return {
    id: s.session_id,
    createdAt: s.created_at ?? new Date().toISOString(),
    title: s.title,
    category: s.category,
    mood: s.mood,
    comment: s.comment,
    activeTime: s.active_time_ms,
    startedAt: s.started_at,
    endedAt: s.ended_at,
  };
}

export const localSessionActions = {
  load(): SessionData[] {
    return (sessionStore.load() as StoredSession[]).map(storedToSessionData);
  },

  add(form: SessionFormData): SessionData {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const stored = formDataToStored(form, id, createdAt);

    const current = sessionStore.load() as StoredSession[];
    sessionStore.save([stored, ...current]);
    return storedToSessionData(stored);
  },

  update(session: SessionData): void {
    const current = sessionStore.load() as StoredSession[];
    const updated = current.map(s =>
      s.id === session.session_id ? sessionDataToStored(session) : s
    );
    sessionStore.save(updated);
  },

  delete(session_id: string): void {
    const current = sessionStore.load() as StoredSession[];
    sessionStore.save(current.filter(s => s.id !== session_id));
  },
};