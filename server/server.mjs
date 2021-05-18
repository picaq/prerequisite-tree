import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

const tasks = express.Router();
const graphs = express.Router();

// original
// tasks.use(express.json());
// tasks.post("/", async (request, response) => {
//   const { name } = request.body;
//   const task = await db.addTask(name);
//   response.status(201).json(task);
// });

// save a graph
tasks.use(express.json());
graphs.use(express.json());

tasks.post("/", async (request, response) => {
  const { graph, nodes, links } = request.body;
  const task = await db.addTask(graph, nodes, links);
  response.status(201).json(task);
});

// load list of graphs
graphs.get("/", async (request, response) => {
  const graphs = await db.getGraphs();
  response.json(graphs);
});

app.use("/api/tasks", tasks);
app.use("/api/graphs", graphs);

process.env?.SERVE_REACT?.toLowerCase() === "true" &&
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
