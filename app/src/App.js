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
    let target, source;
    if (
      tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputTask.toLowerCase()) === -1 &&
      inputTask != ""
    ) {
      const newNode = {
        key: tasksx.length,
        name: inputTask,
      };
      setTasks([...tasksx, newNode]);
      target = newNode.key;
    } else {
      target = tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputTask.toLowerCase());
    }
    if (
      tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputArrow.toLowerCase()) === -1 &&
      inputArrow != ""
    ) {
      const newNode = {
        key: tasksx.length,
        name: inputArrow,
      };
      setTasks([...tasksx, newNode]);
      source = newNode.key;
    } else {
      source = tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputArrow.toLowerCase());
    }
    setInputTask("");
    setInputArrow("");
    addArrow(target, source);
  };

  const [arrows, setArrows] = React.useState(links);
  const [inputArrow, setInputArrow] = React.useState("");
  console.table(arrows);

  const addArrow = (thing, requirement) => {
    console.log("inside addArrow");
    const newLink = {
      source: tasksx[requirement],
      target: tasksx[thing],
      // index: arrows.length,
    };
    setArrows([...arrows, newLink]);
    setInputArrow("");
  };

  // let node = tasksx.key;
  // let set = new Set();
  // for (let link of links) {
  //   for (let [key, value] of Object.entries(link)) {
  //     if (link.source === node || link.target === node) set.add(value);
  //   }
  // }
  // console.log(set);

  return (
    <>
      <header>
        <h1>Prerequisite Tree</h1>
      </header>

      <main className="App">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTasks();
          }}
        >
          <input
            list="nodelist"
            type="search"
            name="query"
            aria-label="Search for all tasks"
            onChange={(e) => setInputTask(e.target.value)}
            value={inputTask}
            placeholder="pick a task"
          />
          requires
          <input
            list="linkable"
            type="search"
            name="query"
            aria-label="Search for existing tasks to connect"
            onChange={(e) => setInputArrow(e.target.value)}
            value={inputArrow}
            placeholder="add requirement"
          />
          <datalist id="nodelist">
            {tasksx.map((node) => (
              <option value={node.name} key={node.key} />
            ))}
          </datalist>
          <datalist id="linkable">
            {tasksx
              .filter(
                (node) =>
                  node.name.toLowerCase() != inputTask.toLowerCase() &&
                  arrows
                    .map((e) => e.source)
                    .indexOf(inputTask.toLowerCase()) === -1,
              )
              .map((node) => (
                <option value={node.name} key={node.key} />
              ))}
          </datalist>
          <button>add link</button>
        </form>

        {/* variable={data} */}
        <Tree nodes={tasksx} links={arrows} />
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
