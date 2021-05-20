import React from "react";

import * as apiClient from "./../apiClient";

// passing in

const LoadScreen = ({ graphInfo, setGraph, setTasks, setArrows }) => {
  // const [graphInfo, setGraphInfo] = React.useState([]);

  // const getGraphInfo = async () => {
  //   try {
  //     const response = async () => setGraphInfo(await apiClient.getGraphs());
  //     const jsonData = await response.json();
  //     setGraphInfo(jsonData);
  //     console.log(jsonData);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // React.useEffect(() => {
  //   getGraphInfo();
  // }, []);

  const getGraphData = async (id) => {
    try {
      const graphData = await apiClient.getGraph(id);
      let graphObj = graphData[0];
      // console.log(graphData);
      console.log(graphObj);
      setGraph(graphObj.graph);
      setTasks(graphObj.nodes);
      setArrows(graphObj.links);
    } catch (error) {
      // console.error("cannot GET graphData");
    }
  };

  return (
    <section>
      <h2>Load Screen</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Graph Name</th>
            {/* <th>User</th> */}
            {/* <th>Time Saved</th> */}
          </tr>
        </thead>
        <tbody>
          {graphInfo.map((info) => (
            <tr key={info.id}>
              <td>{info.id}</td>
              <td>
                <button onClick={() => getGraphData(info.id)}>
                  {info.graph}
                </button>
              </td>
              {/* <td>{info.user}</td> */}
              {/* <td>{info.timestamp}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LoadScreen;
