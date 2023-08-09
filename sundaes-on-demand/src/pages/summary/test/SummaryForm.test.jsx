import SummaryForm from "../SummaryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkboxEl = screen.getByRole("checkbox", {
    name: /I agree to terms and conditions/i,
  });
  // 초기 체크박스가 체크되어 있지 않아야 한다.
  expect(checkboxEl).not.toBeChecked();
  // 초기 버튼이 비활성화되어 있어야 한다.
  const buttonEl = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(buttonEl).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const checkboxEl = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const buttonEl = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(checkboxEl);
  // 체크박스를 클릭하면 버튼이 활성화되어야함
  expect(buttonEl).toBeEnabled();
  // 다시 체크박스를 클릭하면 버튼이 비활성화되어야함
  await user.click(checkboxEl);
  expect(buttonEl).toBeDisabled();
});
