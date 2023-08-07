import { render, screen } from "@testing-library/react";
import App from "./App";

test("빨간색 버튼이 있는지 확인", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: "파랑색으로 변경" });
  // expect(buttonElement).toBeInTheDocument();

  expect(buttonElement).toBeInTheDocument();
});
