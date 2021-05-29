import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getGraphs = async () =>
  await db.any("SELECT id, graph FROM tasks ORDER BY id");

export const getGraph = async (id) =>
  await db.any("SELECT graph, nodes, links FROM tasks WHERE id=$1", [id]);

// original
// export const addTask = async (name) =>
//   (
//     await db.any("INSERT INTO tasks(name) VALUES($1) RETURNING id, name", [
//       name,
//     ])
//   )[0];

export const addTask = async (graph, nodes, links) =>
  await db.any(
    "INSERT INTO tasks(graph, nodes, links) VALUES($1, $2:json, $3:json)",
    [graph, nodes, links],
  );

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
