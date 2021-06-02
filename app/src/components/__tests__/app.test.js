import { render, screen, cleanup } from "@testing-library/react";

import App from "../../App";
import EditGraph from "../EditGraph";
import Tree from "../Tree";

// dummy test
// test("test", () => {
//   expect(true).toBe(true);
// });

afterEach(() => {
  cleanup();
});

// jest cannot render after separating component/conditional render
test("should render Add Task form", () => {
  // setEdit(true);
  render(<App />);
  const taskForm = screen.getByTestId("app-1");
  expect(taskForm).toBeInTheDocument();
});

// strangely, will not pass if <Tree /> is used instead of App
test("should render svg", () => {
  render(<App />);
  const svg = screen.getByTestId("tree-1");
  expect(svg).toBeInTheDocument();
});

// fails to render by component id?
test("should render Tree", () => {
  render(<App />);
  render(<Tree />);
  // const tree = screen.getByTestId("tree-0");
  const tree = screen.getTestByComponent(<Tree />);
  expect(tree).toBeInTheDocument();
});
