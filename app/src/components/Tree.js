import React from "react";

import * as d3 from "d3";

import { useD3 } from "../hooks/useD3";

// passing in
function Tree({ links, nodes, image, opacity }) {
  // console.log(image.hdurl);
  // pink curlies = don’t worry about order of passing in
  const ref = useD3((svg) => {
    // const height = 500;
    // const width = 500;
    const boxHeight = 600;
    const boxWidth = 600;
    // const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(boxWidth / 2, boxHeight / 2))
      // .force('center', d3.forceCenter(width/2, height/2))
      .force("link", d3.forceLink().links(links))
      .on("tick", ticked);
    // console.log("line 18", simulation);
    function updateLinks() {
      const u = d3.select(".links").selectAll("line").data(links);
      u.enter()
        .append("line")
        .merge(u)
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      u.exit().remove();
    }

    function updateNodes() {
      const u = d3.select(".nodes").selectAll("text").data(nodes);

      u.enter()
        .append("text")
        .text(function (d) {
          return d.name;
        })
        .merge(u)
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .attr("dy", function (d) {
          return 5;
        });

      u.exit().remove();
    }

    function ticked() {
      updateNodes();
      updateLinks();
    }
  });

  return (
    <div className="svg-container" style={{ overflow: "visible" }}>
      <svg
        data-testid="tree-1"
        version="1.1"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMinYMin meet"
        className="svg-content"
        ref={ref}
        // style={{width: "100%", height: "100%"}}
        style={{ overflow: "visible" }}
      >
        {/* {image?.hdurl ? (
          <image
            style={{
              backgroundImage: `url(${image.hdurl})`,
              // backgroundColor: "pink",
              backgroundSize: "cover",
              opacity: ".32",
              overflow: "visible",
              enableBackground: "new",
              transform: `translateY(calc(-97vh + 97vmin)) translateX(calc(-55vw + 55vmin))`,
              position: "absolute",
              top: 0,
              // objectFit: "cover",
            }}
            // width={window.innerWidth}
            // width="100%"
            // height={window.innerHeight}
            href={image.hdurl}
          ></image>
        ) : null} */}
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 10 10"
            refX="16.5"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#777" />
          </marker>
        </defs>
        <g style={{ opacity: opacity }}>
          <g className="links"></g>
          <g className="nodes"></g>
        </g>
      </svg>
    </div>
  );
}

export default Tree;
