import * as React from "react";

import * as d3 from "d3";

import * as apiClient from "./apiClient";
// import { useD3 } from "./hooks/useD3";

import "./App.css";

import BarChart from "./components/BarChart";
import Tree from "./components/Tree";

const App = () => {
  // const [tasks, setTasks] = React.useState([]);

  // const loadTasks = async () => setTasks(await apiClient.getTasks());

  // React.useEffect(() => {
  //   loadTasks();
  // }, []);

  const nodes = [
    { key: 0, name: "Birthday Party" },

    { key: 1, name: "activities" },
    { key: 2, name: "party favors" },
    { key: 3, name: "cake" },
    { key: 4, name: "catering" },
    { key: 5, name: "venue" },
    { key: 6, name: "decorations" },

    { key: 7, name: "board games" },
    { key: 8, name: "video games" },

    { key: 9, name: "go to party store" },

    { key: 10, name: "RSVPs" },

    { key: 11, name: "balloons" },
    { key: 12, name: "go to bakery" },
    { key: 13, name: "send invitations" },
    { key: 14, name: "make invitations" },
  ];

  const links = [
    { source: 0, target: 0 },
    { source: 1, target: 0 },
    { source: 2, target: 0 },
    { source: 3, target: 0 },
    { source: 4, target: 0 },
    { source: 5, target: 0 },
    { source: 6, target: 0 },
    { source: 7, target: 1 },
    { source: 8, target: 1 },
    { source: 9, target: 2 },
    { source: 10, target: 2 },
    { source: 10, target: 3 },
    { source: 10, target: 4 },
    { source: 10, target: 5 },
    { source: 11, target: 6 },
    { source: 9, target: 11 },
    { source: 12, target: 3 },
    { source: 12, target: 3 },
    { source: 13, target: 10 },
    { source: 14, target: 13 },
  ];

  const [tasksx, setTasks] = React.useState(nodes);
  const [inputTask, setInputTask] = React.useState("");
  console.table(tasksx);

  const addTasks = () => {
    console.log("inside addTasks");
    const newNode = {
      key: tasksx.length,
      name: inputTask,
    };
    setTasks([...tasksx, newNode]);
    setInputTask("");
  };

  const [arrows, setArrows] = React.useState(links);
  const [inputArrow, setInputArrow] = React.useState("");

  const addArrow = (requirement, thing) => {
    console.log("inside addArrow");
    const newLink = {
      source: requirement,
      target: thing,
    };
    setArrows([...arrows, newLink]);
    setInputArrow("");
  };

  return (
    <>
      <header>
        <h1>Prerequisite Tree</h1>
      </header>

      <main className="App">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tasksx
              .map((e) => e.name.toLowerCase())
              .indexOf(inputTask.toLowerCase()) === -1 && inputTask !== ""
              ? addTasks()
              : setInputTask("");
          }}
        >
          <input
            onChange={(e) => setInputTask(e.target.value)}
            value={inputTask}
            placeholder="add something"
          />

          <button>add task</button>
        </form>

        {/* variable={data} */}
        <Tree nodes={tasksx} links={links} />
      </main>
    </>
  );
};

// const TaskList = ({ tasks }) => (
//   <ul>
//     {tasks.map(({ id, name }) => (
//       <li key={id}>{name}</li>
//     ))}
//   </ul>
// );

// const AddTask = ({ loadTasks }) => {
//   const [task, setTask] = React.useState("");

//   const canAdd = task !== "";

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (canAdd) {
//       await apiClient.addTask(task);
//       loadTasks();
//       setTask("");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label>
//         New task:{" "}
//         <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
//       </label>
//       <button disabled={!canAdd}>Add</button>
//     </form>
//   );
// };

export default App;
