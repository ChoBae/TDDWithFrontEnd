import { screen, render } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  // 서버에서 사진이 로드되는지 확인한다.
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
    render(<Options optionType="toppings" />);
    const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});
