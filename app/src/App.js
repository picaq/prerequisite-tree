import * as React from "react";

import * as apiClient from "./apiClient";
import EditGraph from "./components/EditGraph";
import Information from "./components/Information";
import LoadScreen from "./components/LoadScreen";
import Tree from "./components/Tree";
import "./normalize.css";
import "./App.css";

const App = () => {
  const [image, setImage] = React.useState([""]);

  const loadImage = async () => {
    try {
      setImage(await apiClient.getImage());

      console.log("NASA API key being used");
    } catch (error) {
      console.warn("warning: DEMO_KEY being used");
      await fetch(
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

  const [tasksx, setTasks] = React.useState([...nodes]);
  const [inputTask, setInputTask] = React.useState("");
  console.table(tasksx);

  const addTasks = () => {
    console.log("inside addTasks");
    if (
      tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputTask.toLowerCase().trim()) === -1 &&
      inputTask !== ""
    ) {
      const newNode = {
        key: tasksx.length,
        name: inputTask.trim(),
      };
      setTasks([...tasksx, newNode]);
    }
  };

  const addLinks = () => {
    console.log("inside addLinks");
    let target, source;
    if (
      tasksx
        .map((e) => e.name.toLowerCase())
        .indexOf(inputTask.toLowerCase().trim()) === -1 &&
      inputTask !== ""
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
      inputArrow !== ""
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
    }
  };

  const [arrows, setArrows] = React.useState([...links]);
  const [inputArrow, setInputArrow] = React.useState("");
  console.table(arrows);

  const addArrow = (thing, requirement) => {
    console.log("inside addArrow");
    const newLink = {
      source: requirement,
      target: thing,
    };

    setArrows([...arrows, newLink]);
    setInputArrow("");
  };

  const clear = () => {
    setTasks([]);
    setInputArrow("");
    setInputTask("");
    setArrows([]);
    setGraph("");
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
    let nodes = tasksx.map((node) => ({ key: node.key, name: node.name })),
      links = arrows.map((node) => ({
        source: node.source.key,
        target: node.target.key,
      }));
    let saveData = { graph, nodes, links };
    // e.preventDefault(); // prevents refreshing
    let canAdd = saveData.nodes.length > 0 && graph.length > 0;
    if (canAdd) {
      await apiClient.addTask(saveData);
    }
  };

  // loading list from db
  const [graphInfo, setGraphInfo] = React.useState([]);

  const getGraphInfo = async () => {
    try {
      let list = await apiClient.getGraphs();
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

  // show/hide load screen state hooks
  const [load, setLoad] = React.useState(false);

  // show/hide edit graph state hooks
  const [edit, setEdit] = React.useState(false);

  // show/hide edit information state hooks
  const [info, setInfo] = React.useState(false);

  // opacity state hooks
  const [opacity, setOpacity] = React.useState(1);

  return (
    <>
      <header>
        <h1>Prerequisite Tree</h1>
        <button
          className="info"
          onClick={() => {
            setInfo(true);
            setLoad(false);
            setEdit(false);
            setOpacity(0.2);
          }}
        >
          <em>?﻿</em>
        </button>
      </header>

      <main className="App">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getGraphInfo();
          }}
        >
          <button
            onClick={() => {
              setLoad(load ? false : true);
              setEdit(false);
              setInfo(false);
              setOpacity(1);
            }}
          >
            {" "}
            {load ? "Hide" : "Show"}
            {"  Load Screen"}
          </button>

          <button
            onClick={() => {
              setEdit(edit ? false : true);
              setLoad(false);
              setInfo(false);
              setOpacity(1);
            }}
          >
            {" "}
            {edit ? "Hide Edit Options" : "Edit Graph"}
          </button>

          <button
            onClick={() => {
              clear();
              setLoad(false);
              setEdit(true);
              setInfo(false);
              setOpacity(1);
            }}
          >
            {" "}
            New Graph{" "}
          </button>
        </form>

        {edit ? (
          <EditGraph
            {...{
              tasksx,
              arrows,
              graph,
              setGraph,
              inputTask,
              setInputTask,
              inputArrow,
              setInputArrow,
              addTasks,
              addLinks,
              onSave,
            }}
          />
        ) : (
          <></>
        )}
        <Tree nodes={tasksx} links={arrows} image={image} opacity={opacity} />
        {load ? (
          <LoadScreen
            setGraph={setGraph}
            setArrows={setArrows}
            setTasks={setTasks}
            clear={() => clear()}
            graphInfo={graphInfo}
          />
        ) : (
          <></>
        )}
        <footer>
          <p>
            NASA image of the day:{" "}
            <em>
              <a
                href="https://apod.nasa.gov/apod/astropix.html"
                target="_blank"
                rel="noreferrer"
              >
                {image.title}
              </a>
            </em>
            {" "}
            for {new Date(image.date).toDateString()}
          </p>
        </footer>
      </main>
      {info ? <Information /> : <></>}
    </>
  );
};

export default App;
