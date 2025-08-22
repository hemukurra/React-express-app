import { useEffect, useState } from "react";
import { api } from "../api"; // if using the helper above

export default function Items() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    try {
      const data = await api("/items");
      setItems(data);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function addItem(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newItem = await api("/items", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      setItems([newItem, ...items]);
      setTitle("");
    } catch (e) {
      setErr(e.message);
    }
  }

  async function toggleItem(item) {
    try {
      const updated = await api(`/items/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ bought: !item.bought }),
      });
      setItems(items.map(i => (i.id === item.id ? updated : i)));
    } catch (e) {
      setErr(e.message);
    }
  }

  async function deleteItem(id) {
    try {
      await api(`/items/${id}`, { method: "DELETE" });
      setItems(items.filter(i => i.id !== id));
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Your Items</h2>
      {err && <div style={{ color: "crimson" }}>{err}</div>}

      <form onSubmit={addItem} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Add item..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {items.map(i => (
          <li key={i.id} style={{ border: "1px solid #ddd", padding: 8, display: "flex", justifyContent: "space-between" }}>
            <span
              onClick={() => toggleItem(i)}
              style={{ textDecoration: i.bought ? "line-through" : "none", cursor: "pointer" }}
            >
              {i.title}
            </span>
            <button onClick={() => deleteItem(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
