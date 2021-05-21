import { render, screen, cleanup } from "@testing-library/react";

import App from "../../App";
import Tree from "../Tree";
test("test", () => {
  expect(true).toBe(true);
});
test("should render svg", () => {
  render(<App />);
  render(<Tree />);
  const svgElement = screen.getByTestId("tree-1");
  expect(svgElement).toBeInTheDocument();
});
