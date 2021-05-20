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

// load all graph info to load screen
export const getGraphs = async () => {
  const response = await fetch("/api/graphs");
  // console.log(response.json());
  return response.json();
  // return { response: ["pong"] };
};

// load a single graph coordinates to svg
export const getGraph = async (id) => {
  const response = await fetch(("/graph/"+id));
  // `/api/user/?email=${encodeURIComponent(email)}`
  return response.json();
  // return { response: ["pong"] };
};

const KEY = process.env.REACT_APP_NASA_API_KEY

export const getImage = async () => {
  
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${
      KEY
        ? KEY
        : "DEMO_KEY"
    }`,
    // {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    //     "Access-Control-Allow-Headers":
    //       "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //   },
    // },
  );
  // console.log(process.env.NASA_API_KEY);
  return response.json();
};

// export const getTasks = async () => {
//   const response = await fetch("/api/tasks");
//   return response.json();
// };
