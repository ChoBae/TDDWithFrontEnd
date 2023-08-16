import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useEffect, useState } from "react";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        //TODO: handle error here
      });
  }, []);

  function handleClick() {
    // 주문 내용 컨텍스트 초기화
    resetOrder();
    // 주문 페이지로 돌아가기
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
