import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../utils";
export default function OrderEntry() {
  const { totals } = useOrderDetails();
  let totalValue = 0;
  for (let key in totals) {
    totalValue += totals[key];
  }
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totalValue)}</h2>
    </div>
  );
}
