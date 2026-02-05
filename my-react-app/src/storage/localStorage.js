export function createLocalStore(key) {
  function load() {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function add(item) {
    const items = load();

    save([
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...item,
      },
      ...items,
    ]);
  }

  function save(items) {
    localStorage.setItem(key, JSON.stringify(items));
  }
  function clear() {
    localStorage.removeItem(key);
  }
  return { load, add, save, clear };
}
export const sessionStore = createLocalStore("localsessions");
export const todoStore = createLocalStore("localtodos");
