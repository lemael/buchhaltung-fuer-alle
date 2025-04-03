import React, { useEffect, useState } from "react";

function App() {
  // State für die Aufgaben
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim Laden:", error));
  }, []);
  const handleAddTask = async () => {
    // Validierung der Eingabe
    if (newTask.trim() === "") return;

    // Envoie vers Django API
    try {
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask, completed: false }),
      });

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Aufgabe:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📝 Meine Aufgaben</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Neue Aufgabe eingeben"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "60%",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Hinzufügen
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            {task.title} {task.completed ? "✔️" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
