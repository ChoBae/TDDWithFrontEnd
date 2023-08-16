import { render, screen } from "../../src/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("일반적인 주문 단계 테스트", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);
  // 아이스크림 스쿱과 토핑을 추가한다.
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesInput);

  // 주문 버튼을 찾고, 클릭한다.
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // 주문 요약 페이지를 체크한다.
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();
  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();
  // 선택된 옵션 아이템을 체크한다.
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();
  // terms and conditons 체크 이후 주문을 제출한다.
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmButton);
  // 로딩 스피너를 확인한다.
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  // 확인 페이지를 체크한다.
  const thankHeading = await screen.findByRole("heading", {
    name: /thank you!/i,
  });
  expect(thankHeading).toBeInTheDocument();

  // 로딩 스피너가 사라졌는지 확인한다.
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  // 확인 페이지에서 제출된 주문 번호를 확인한다.
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // 확인 페이지에서 new order 버튼을 클릭한다.
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);
  // 스쿱과 토핑 각각의 총 금액이 초기화됐는지 확인한다.
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
  // "not wrapped in act()" 에러
  unmount();
});
