import * as React from "react";
import * as d3 from "d3";

import * as apiClient from "./apiClient";

import "./App.css";

const App = () => {
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="App">
    <h1>Prerequisite Tree</h1>


      <TaskList tasks={tasks} />
      <AddTask loadTasks={loadTasks} />
    </main>
  );
};

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

const AddTask = ({ loadTasks }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await apiClient.addTask(task);
      loadTasks();
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default App;
