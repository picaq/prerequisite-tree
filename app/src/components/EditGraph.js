import React from "react";

// passing in
const EditGraph = ({
  tasksx,
  arrows,
  graph,
  setGraph,
  inputTask,
  setInputTask,
  inputArrow,
  setInputArrow,
  clear,
  addTasks,
  addLinks,
  onSave,
}) => {
  return (
    <section>
      <h2>Add Task</h2>
      <form
        data-testid="app-1"
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
      <h2>Name to save {graph ? graph : "New Graph"}</h2>
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
      </form>
    </section>
  );
};

export default EditGraph;
