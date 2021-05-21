import { render, screen, cleanup } from "@testing-library/react";

import App from "../../App";

// dummy test
// test("test", () => {
//   expect(true).toBe(true);
// });

test("should render Add Task form", () => {
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
