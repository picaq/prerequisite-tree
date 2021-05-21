import { render, screen, cleanup } from "@testing-library/react";

import App from "../../App";
// import Tree from "../Tree";

// dummy test
// test("test", () => {
//   expect(true).toBe(true);
// });

test("should render Add Task form", () => {
  render(<App />);
  const taskForm = screen.getByTestId("app-1");
  expect(taskForm).toBeInTheDocument();
});
