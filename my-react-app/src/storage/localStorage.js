const key = "localsessions";

export function loadSession() {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addLocalSession(sessionToSave) {
  const sessions = loadSession();

  const toSave = [
    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...sessionToSave,
    },
    ...sessions,
  ];
  saveLocalSessions(toSave);
}

export function saveLocalSessions(sessions) {
  localStorage.setItem(key, JSON.stringify(sessions));
}

export function clearSession() {
  localStorage.removeItem(key);
}
