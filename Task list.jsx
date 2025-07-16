import axios from "axios";

function TaskList({ tasks, setTasks }) {
  const toggleTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`)
         .then(res => {
           setTasks(tasks.map(task =>
             task.id === id ? res.data : task
           ));
         });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
         .then(() => {
           setTasks(tasks.filter(task => task.id !== id));
         });
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="flex justify-between items-center mb-2">
          <span
            onClick={() => toggleTask(task.id)}
            className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
