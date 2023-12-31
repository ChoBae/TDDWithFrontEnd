import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App, { replaceCamelWithSpaces } from "./App";

test("초기화면에 초기 색상에 맞는 버튼이 있는지 확인하고, 버튼을 클릭시 색상이 변경되는지 확인한다", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  // 초기 버튼 색상 확인
  expect(buttonElement).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // 버튼 클릭 이벤트 발생
  fireEvent.click(buttonElement);

  // 버튼의 색상이 변경됐는지 확인한다
  expect(buttonElement).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // 버튼의 텍스트가 변경됐는지 확인한다
  expect(buttonElement).toHaveTextContent("Change to Medium Violet Red");
});

test("초기화면에 버튼이 enable인지 확인하고, 체크박스가 uncheck인지 확인한다.", () => {
  render(<App />);

  const buttonEle = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  // 초기 화면에 버튼이 enable인지 확인한다
  expect(buttonEle).toBeEnabled();

  const checkboxEle = screen.getByRole("checkbox");
  // 초기 화면에 체크박스가 uncheck인지 확인한다
  expect(checkboxEle).not.toBeChecked();
});

test("체크박스 클릭시 버튼이 비활성화되고, 다시 클릭하면 활성화된다", () => {
  render(<App />);
  const checkboxEle = screen.getByRole("checkbox", { name: "Disable button" });
  const buttonEle = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkboxEle);
  expect(buttonEle).toBeDisabled();

  fireEvent.click(checkboxEle);
  expect(buttonEle).toBeEnabled();
});

test("체크박스 클릭시 버튼이 그레이색으로 변경된다.", () => {
  render(<App />);
  const checkboxEle = screen.getByRole("checkbox", { name: "Disable button" });
  const buttonEle = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  // 체크박스를 클릭해서 버튼을 비활성화 시켰을때 버튼 색상이 그레이색으로 변경되는지 확인한다
  fireEvent.click(checkboxEle);
  expect(buttonEle).toHaveStyle({ backgroundColor: "gray" });
  // 체크박스를 클릭해서 버튼을 활성화 시켰을때 버튼 색상이 빨강색으로 변경되는지 확인한다.
  fireEvent.click(checkboxEle);
  expect(buttonEle).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("체크박스 클릭시 버튼이 enable될때 색상이 유지되는지 확인한다.", () => {
  render(<App />);
  const checkboxEle = screen.getByRole("checkbox", {
    name: "Disable button",
  });
  const buttonEle = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // 버튼색상을 파랑색으로 변경한다
  fireEvent.click(buttonEle);
  // 체크박스를 클릭해서 버튼을 비활성화 시켰을때 버튼 색상이 그레이색으로 변경되는지 확인한다
  fireEvent.click(checkboxEle);
  expect(buttonEle).toHaveStyle({ backgroundColor: "gray" });
  // 체크박스를 클릭해서 버튼을 활성화 시켰을때 버튼 색상이 파랑색으로 유지되어있는지 확인한다.
  fireEvent.click(checkboxEle);
  expect(buttonEle).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
  test("Works for one inner capital letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
