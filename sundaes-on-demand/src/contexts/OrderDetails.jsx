import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };
    // update option count for this item with the new value
    const optionCountsMap = optionCounts[optionType];
    optionCountsMap.set(itemName, parseInt(newItemCount));
    setOptionCounts(newOptionCounts);
  }
  function resetOrder() {
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    });
  }
  function calculateSubtotal(optionType) {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[optionType];
  }
  const totals = {
    scoops: calculateSubtotal("scoops"),
    toppings: calculateSubtotal("toppings"),
  };
  const value = {
    optionCounts,
    setOptionCounts,
    totals,
    updateItemCount,
    resetOrder,
  };
  return <OrderDetails.Provider value={value} {...props} />;
}
