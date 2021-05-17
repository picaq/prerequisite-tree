import * as React from "react";

import * as apiClient from "./apiClient";
// import { useD3 } from "./hooks/useD3";

import "./App.css";

import BarChart from "./components/BarChart";
import Tree from "./components/Tree";

require("dotenv").config();

const App = () => {
  // const [tasks, setTasks] = React.useState([]);

  // const loadTasks = async () => setTasks(await apiClient.getTasks());

  // React.useEffect(() => {
  //   loadTasks();
  // }, []);

  const [image, setImage] = React.useState([""]);
  // const loadImg = async () => setTasks(await apiClient.getTasks());
  const loadImage = async () => {
    try {
      // const response = await fetch(
      //   "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      //       "Access-Control-Allow-Headers":
      //         "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      //     },
      //   },
      // );
      // const jsonData = await response.json();
      setImage(await apiClient.getImage());
      // setColor(Math.floor(361* Math.random()));
      // setImage(jsonData);
      // console.log(color, jsonData);
      console.log("NASA API key being used");
    } catch (error) {
      console.warn("warning: DEMO_KEY being used");
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          },
        },
      );
      const jsonData = await response.json();
      setImage(jsonData);
    }
  };

  React.useEffect(() => {
    loadImage();
  }, []);

  let nodes = [
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

  let links = [
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

  // const [savedNodes, setSavedNodes] = React.useState(nodes);
  const [tasksx, setTasks] = React.useState([...nodes]);
  const [inputTask, setInputTask] = React.useState("");
  console.table(tasksx);
  // console.table(savedNodes);

  const addTasks = () => {
    console.log("inside addTasks");
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
      // nodes.push({ ...newNode });
      // console.table(nodes);
      // setSavedNodes([...savedNodes, { ...newNode }]);
      setTasks([...tasksx, newNode]);
    }
    // setInputTask("");
  };

  const addLinks = () => {
    console.log("inside addLinks");
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
    // console.log(links);
  };

  // const [savedLinks, setSavedLinks] = React.useState(links);
  const [arrows, setArrows] = React.useState([...links]);
  const [inputArrow, setInputArrow] = React.useState("");
  console.table(arrows);
  // console.table(savedLinks);

  const addArrow = (thing, requirement) => {
    console.log("inside addArrow");
    const newLink = {
      source: requirement,
      target: thing,
      // index: arrows.length,
    };
    // links.push({ ...newLink });
    // console.table(links);
    // setSavedLinks([...savedLinks, { ...newLink }]);
    setArrows([...arrows, newLink]);
    setInputArrow("");
  };

  const clear = () => {
    // nodes.length = 0;
    // links.length = 0;
    setTasks([]);
    // setSavedNodes([]);
    setInputArrow("");
    setInputTask("");
    setArrows([]);
    setGraph("");
    // setSavedLinks([]);
    // console.log({ savedNodes });
    // console.log({ savedLinks });
  };

  // let node = tasksx.key;
  // let set = new Set();
  // for (let link of links) {
  //   for (let [key, value] of Object.entries(link)) {
  //     if (link.source === node || link.target === node) set.add(value);
  //   }
  // }
  // console.log(set);

  const [graph, setGraph] = React.useState("Birthday Party");

  const onSave = async (e) => {
    let nodes = tasksx,
      links = arrows;
    let saveData = { graph, nodes, links };
    e.preventDefault(); // prevents refreshing
    let canAdd = saveData.nodes.length > 0 && graph.length > 0;
    if (canAdd) {
      await apiClient.addTask(saveData);
      // loadTasks();
      // setTask("");
    }
  };

  return (
    <>
      <header>
        <h1>Prerequisite Tree</h1>
      </header>

      <main
        className="App"
        // style={{
        //   backgroundImage: `url(${image.hdurl})`,
        //   backgroundSize: "cover",
        // }}
      >
        <h2>Add Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTasks();
          }}
        >
          <input
            onChange={(e) => setInputTask(e.target.value)}
            value={inputTask}
            placeholder="add something new"
          />

          <button>add task</button>
        </form>
        <h2>Add Links</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addLinks();
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
        <h2>Options for {graph ? graph : "untitled goal"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={graph}
            onChange={(e) => setGraph(e.target.value)}
            placeholder="name me to save me"
          ></input>
          <button onClick={onSave}> save </button>
          <button> load </button>
          <button onClick={clear}>new graph</button>
        </form>
        {/* variable={data} */}
        <Tree nodes={tasksx} links={arrows} image={image} />
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
