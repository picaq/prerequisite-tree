import React from "react";

// passing in

const LoadScreen = ({ graphInfo }) => {
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
              <td>{info.graph}</td>
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
