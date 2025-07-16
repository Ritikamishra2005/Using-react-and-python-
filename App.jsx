import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
         .then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post("http://localhost:5000/tasks", { title: newTitle })
         .then(res => {
           setTasks([...tasks, res.data]);
           setNewTitle("");
         });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daily Tasks</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Enter task"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 mb-4">
        Add Task
      </button>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
