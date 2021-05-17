import dotenv from "dotenv";

export const getTasks = async () => {
  const response = await fetch("/api/tasks");
  return response.json();
};

export const addTask = async (saveData) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveData),
  });
  return response.json();
};

export const getImage = async () => {
  // dotenv.config({ path: "../../.env" });
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=" + process.env.NASA_API_KEY,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
    },
  );
  console.log(process.env.NASA_API_KEY);
  return response.json();
};
