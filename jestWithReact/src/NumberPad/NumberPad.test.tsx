import { render, screen } from "@testing-library/react";
import NumberPad from "./index";

test("넘버 패드에 모든 숫자가 있는지 확인", () => {
  render(<NumberPad />);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numbers.forEach((number) => {
    const numberButton = screen.getByText(number);
    expect(numberButton).toBeInTheDocument();
  });
});


test("")