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
  const user = userEvent.setup();
  render(<SummaryForm />);
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

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // queryBy는 해당 요소가 없으면 null을 반환한다.(다른 메소드는 에러를 반환한다.)
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  // 초기 화면에 popover가 보이지 않아야 한다.
  expect(nullPopover).not.toBeInTheDocument();
  // 마우스가 체크박스의 label 위에 올라가면 popover가 보여야 한다.
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // 마우스가 체크박스의 label에서 벗어나면 popover가 사라져야 한다.
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
  
});
