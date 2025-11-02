import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);

  const addUser = async () => {
    if (!newUser.trim()) return;
    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newUser }),
    });
    setNewUser("");
    // Refresca la lista
    const res = await fetch("http://localhost:8080/api/users");
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios desde PostgreSQL</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Nuevo usuario"
        />
        <button onClick={addUser} style={{ marginLeft: 10 }}>
          Agregar
        </button>
      </div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

