import * as React from "react";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";

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

// test("calls onClick prop when clicked", () => {
//   const handleClick = jest.fn();
//   render(<App handleClick={handleClick} />);
//   fireEvent.click(screen.getByText(/edit/i));
//   expect(handleClick).toHaveBeenCalledTimes(1);
// });

// jest cannot render after separating component/conditional render
// test("should render Add Task form", () => {
//   // setEdit(true);
//   // const [edit, setEdit] = React.useState(true);
//   // render(<App edit={edit} setEdit={setEdit} />);
//   render(<EditGraph />);
//   const taskForm = screen.getByTestId("app-1");
//   expect(taskForm).toBeInTheDocument();
// });

// tests for Tree to render
test("should render Tree", () => {
  render(<App />);
  // render(<Tree />);
  // const tree = screen.getByTestId("tree-0");
  const tree = screen.getByTestId("tree-0");
  expect(tree).toBeInTheDocument();
});

// strangely, will not pass if <Tree /> is used instead of App
test("should render svg", () => {
  render(<App />);
  const svg = screen.getByTestId("tree-1");
  expect(svg).toBeInTheDocument();
});

test("should render Load Screen button", () => {
  render(<App />);
  const button = screen.getByTestId("button-1");
  expect(button).toBeInTheDocument();
});

test("should render Edit Graph button", () => {
  render(<App />);
  const button = screen.getByTestId("button-2");
  expect(button).toBeInTheDocument();
});

test("should render New Graph button", () => {
  render(<App />);
  const button = screen.getByTestId("button-3");
  expect(button).toBeInTheDocument();
});

test("should render Info button", () => {
  render(<App />);
  const button = screen.getByTestId("button-4");
  expect(button).toBeInTheDocument();
});
