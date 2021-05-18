import dotenv from "dotenv";

// export const getTasks = async () => {
//   const response = await fetch("/api/tasks");
//   return response.json();
// };

export const addTask = async (saveData) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveData),
  });
  // return pgp()(response.json());
  // return response.json();
};

export const getImage = async () => {
  // dotenv.config({ path: "../../.env" });
  dotenv.config({ path: "../.env" });

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${
      process.env.REACT_APP_NASA_API_KEY
        ? process.env.REACT_APP_NASA_API_KEY
        : process.env.NASA_API_KEY
        ? process.env.NASA_API_KEY
        : "DEMO_KEY"
    }`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
    },
  );
  // console.log(process.env.NASA_API_KEY);
  return response.json();
};

export const getTasks = async () => {
  const response = await fetch("/api/tasks");
  return response.json();
};

export const getGraphs = async () => {
  const response = await fetch("/api/graphs");
  return response.json();
};
