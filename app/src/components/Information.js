import React from "react";

const Information = () => {
  return (
    <aside>
      <p>
        Prerequisite Tree is a tool to plan complex tasks and long-term goals.
        The generic example is a Birthday Party. The most common examples are
        recipes, and the more complex are degree programs.
      </p>
      <p>
        <li>
          [Show Load Screen] loads a list of existing graphs for you to view.
        </li>
        <li>[Edit Graoh] allows you to edit any existing graph.</li>
        <li>[New Graph] creates a graph from scratch.</li>
      </p>
      <p>
        How to Edit a Graph
        <ol>
          <li>
            Add a Task. Name it anything. Press enter, return, or click [Add
            Task].
          </li>
          <li>
            The first field of Add Links should already be filled with your
            just-added task.
          </li>
          <li>
            You can select a requirement from the list or write in your own.
            [Add Link] will create a new linkage with an arrow pointing from the
            requirement (or prerequisite) to the target task. With more tasks
            added you can search in the Add Links fields to link-up existing
            tasks.
          </li>
          <li>
            To save your graph to the databse, you must name it in the final
            field and press [Save], return, or enter.
          </li>
          <li>
            After saving you should be able to see your graph by pressing [Show
            Load Screen]
          </li>
        </ol>
      </p>
      <p>
        Additional Info
        <ul>
          <li>
            If you keep adding tasks without creating linkages, they will likely
            fly off screen. You can still select them from the list when
            creating a linkage to bring them back.
          </li>
          <li>
            You cannot create dupicate tasks. The fields are case insensitive.
          </li>
        </ul>
      </p>
    </aside>
  );
};

export default Information;
