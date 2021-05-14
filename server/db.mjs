import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = async () => await db.any("SELECT * FROM tasks");

// original
// export const addTask = async (name) =>
//   (
//     await db.any("INSERT INTO tasks(name) VALUES($1) RETURNING id, name", [
//       name,
//     ])
//   )[0];

export const addTask = async (graph, nodes, links) =>
  // let [graph, nodes, links] = [name.graph, name.nodes, name.links];
  await db.any("INSERT INTO tasks(graph, nodes, links) VALUES($1, $2, $3);", [
    graph,
    nodes,
    links,
  ]);

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
