import { useD3 } from '../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function Tree({ data }) {
    const ref = useD3(
      (svg) => {
        const height = 500;
        const width = 500;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  
        const x = d3
          .scaleBand()
          .domain(data.map((d) => d.year))
          .rangeRound([margin.left, width - margin.right])
          .padding(0.1);
  
 
        svg.select(".x-axis").call(xAxis);
        svg.select(".y-axis").call(y1Axis);
  
        svg
          .select(".plot-area")
          .attr("fill", "steelblue")
          .selectAll(".bar")
          .data(data)
          .join("rect")
          .attr("class", "bar")
          .attr("x", (d) => x(d.year))
          .attr("width", x.bandwidth())
          .attr("y", (d) => y1(d.sales))
          .attr("height", (d) => y1(0) - y1(d.sales));
      }
    );
  
    return (

      <svg style="width: 100%; height: 100%">
      <defs>
    <marker id="triangle" viewBox="0 0 10 10"
          refX="1" refY="5"
          markerUnits="strokeWidth"
          markerWidth="10" markerHeight="10"
          orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#777"/>
    </marker>
  </defs>
      
      <g class="links"></g>
      <g class="nodes"></g>
    </svg>

    );
  }
  
  export default Tree;