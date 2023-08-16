import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../utils";
import Button from "react-bootstrap/esm/Button";
export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  let totalValue = 0;
  for (let key in totals) {
    totalValue += totals[key];
  }

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totalValue)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
}
