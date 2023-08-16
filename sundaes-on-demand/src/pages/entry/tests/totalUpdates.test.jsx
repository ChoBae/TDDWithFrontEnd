import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

test("스쿱이 변경될때 마다 총액이 업데이트 되어야 한다.", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  // 총액은 $0.00로 시작한다.
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // 바닐라 스쿱이 1 추가되면 $2.00이 된다.
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // 초코 스쿱이 2 추가되면 $6.00이 된다.
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("토핑이 변경될때 마다  총액이 업데이트 되어야 한다.", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  // 총액은 $0.00로 시작한다.
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
  // 체리 토핑이 추가되면 $1.50이 된다. "Hot fudge", "M&Ms", Cherries
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  // M&Ms 토핑이 추가되면 $3.00이 된다.
  const mandmsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mandmsInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  // 체리 토핑을 제거하면 $1.50이 된다.
  await user.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("총 금액 테스트", () => {
  test("시작 시 총 금액이 $0.00인지 확인한다.", () => {
    const { unmount } = render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /grand total: \$/i });
    expect(total).toHaveTextContent("0.00");

    unmount();
  });
  test("스쿱이 먼저 추가되었을때 총 금액이 어떻게 변경되었는지 확인한다.", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /grand total: \$/i });
    // 바닐라 스쿱을 2 추가한 후 총 금액이 4인지 확인한다.
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(total).toHaveTextContent("4.00");
    // 체리 토핑을 추가하고 총 금액이 5.5인지 확인한다.
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesInput);
    expect(total).toHaveTextContent("5.50");
  });
  test("토핑이 추가되었을때 총 금액이 변경되었는지 확인한다.", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const total = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // 체리 토핑을 추가한 후 총 금액이 1.5인지 확인한다.
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesInput);
    expect(total).toHaveTextContent("1.50");
    // 바닐라 스쿱을 2 추가한 후 총 금액이 5.5인지 확인한다.
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(total).toHaveTextContent("5.50");
  });
  test("스쿱이 제거되었을때 총 금액이 변경되었는지 확인한다.", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const total = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // 체리 토핑을 추가한다.
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesInput);
    // 총 금액 $1.50;
    // 바닐라 스쿱을 2번 추가한다. 총 금액은 $5.50가 되어야한다.
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    // 총 금액 $5.50
    // 바닐라 스쿱을 1번 제거하고, 총 금액을 확인한다
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(total).toHaveTextContent("3.50");
    // 체리 토핑을 제거하고, 총 금액을 확인한다.
    await user.click(cherriesInput);
    expect(total).toHaveTextContent("2.00");
  });
});
