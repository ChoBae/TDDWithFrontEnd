import { render, screen } from "@testing-library/react";
import NumberPad from "./index";


test("넘버 패드에 모든 숫자가 있는지 확인", () => {
  render(<NumberPad />);
  const numberButtons = screen.getAllByRole("button", { name: /\d/ });
  expect(numberButtons).toHaveLength(9);
});
