import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);
    // 서버에서 사진이 로드되는지 확인한다.
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
    
});
