import * as React from "react";

import * as apiClient from "./apiClient";
import BarChart from "./components/BarChart";
import Load from "./components/LoadScreen";
import Tree from "./components/Tree";

import "./App.css";

// import dotenv from "dotenv";

// console.log(process.env.REACT_APP_NASA_API_KEY);
// console.log(process.env.NASA_API_KEY);

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
      setImage(await apiClient.getImage());

      console.log("NASA API key being used");
    } catch (error) {
      console.warn("warning: DEMO_KEY being used");
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
        // "https://api.nasa.gov/planetary/apod?api_key=" +
        //   process.env.REACT_APP_NASA_API_KEY,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          },
        },
      );
      // const jsonData = await response.json();
      // setImage(jsonData);
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
        .indexOf(inputTask.toLowerCase().trim()) === -1 &&
      inputTask != ""
    ) {
      const newNode = {
        key: tasksx.length,
        name: inputTask.trim(),
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
        .indexOf(inputTask.toLowerCase().trim()) === -1 &&
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
        .indexOf(inputTask.toLowerCase().trim());
    }
    if (
      tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputArrow.toLowerCase().trim()) === -1 &&
      inputArrow != ""
    ) {
      const newNode = {
        key: tasksx.length,
        name: inputArrow.trim(),
      };
      setTasks([...tasksx, newNode]);
      source = newNode.key;
    } else {
      source = tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputArrow.toLowerCase().trim());
    }
    if (inputArrow !== "" && inputTask !== "") {
      setInputTask("");
      setInputArrow("");
      addArrow(target, source);
      // console.log(links);
    }
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

  // saving to db
  const onSave = async () => {
    let nodes = tasksx,
      links = arrows;
    let saveData = { graph, nodes, links };
    // e.preventDefault(); // prevents refreshing
    let canAdd = saveData.nodes.length > 0 && graph.length > 0;
    if (canAdd) {
      await apiClient.addTask(saveData);
      // loadTasks();
      // setTask("");
    }
  };

  // loading list from db
  const [graphInfo, setGraphInfo] = React.useState([]);

  const getGraphInfo = async () => {
    try {
      let list = await apiClient.getGraphs();
      // setGraphInfo(await apiClient.getGraphs());
      setGraphInfo(list);
      console.log(graphInfo);
    } catch (error) {
      setGraphInfo([
        { id: 1, graph: "Birthday Party" },
        { id: 2, graph: "I like cats" },
        { id: 3, graph: "I like cats2" },
        { id: 4, graph: "convince parents to let me get a cat" },
      ]);
      console.warn("using dummy graphData");
    }
  };

  // loading graph nodes and links from db
  const getGraphData = async () => {
    try {
      const graphData = await apiClient.getGraphs();
      console.log(graphData);
    } catch (error) {
      console.error("failed to GET graphData");
    }
  };

  return (
    <>
      <header>
        <h1>Prerequisite Tree deployyy 2</h1>
      </header>

      <main
        className="App"
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
            if (
              (inputTask !== "" &&
                inputArrow !== "" &&
                inputTask.toLowerCase().trim() !==
                  inputArrow.toLowerCase().trim() &&
                tasksx.filter(
                  (node) =>
                    node.name.toLowerCase() === inputTask.toLowerCase().trim(),
                )) ||
              tasksx.filter(
                (node) =>
                  node.name.toLowerCase() === inputArrow.toLowerCase().trim(),
              )
            ) {
              addLinks();
            } else console.error("cannot make links");
          }}
        >
          <input
            list="nodelist"
            type="search"
            name="query"
            aria-label="Search for all tasks"
            autocomplete="off"
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
            autocomplete="off"
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
                  node.name.toLowerCase() != inputTask.toLowerCase().trim() &&
                  arrows
                    .map((e) => e.source)
                    .indexOf(inputTask.toLowerCase().trim()) === -1,
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
          <button onClick={() => onSave()}> save </button>
          <button onClick={() => getGraphInfo()}> load </button>
          <button onClick={() => clear()}> new graph </button>
        </form>
        <Tree nodes={tasksx} links={arrows} image={image} />
        <Load
          // graphName={graphName} userName={userName} timestamp={timestamp}
          setGraph={setGraph}
          setArrows={setArrows}
          setTasks={setTasks}
          clear={() => clear()}
          graphInfo={graphInfo}
        />
      </main>
    </>
  );
};

export default App;
