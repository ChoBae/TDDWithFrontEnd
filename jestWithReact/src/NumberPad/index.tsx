import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { number } from "zod";

const Button = styled.button`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 2em;
  margin: 10px;
`;

const ExtraButton = styled.button`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 2em;
  margin: 10px;
  grid-column: 2;
`;

const NumberPad = () => {
  const [numberList, setNumberList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [extraNumber, setExtraNumber] = useState(0);
  useEffect(() => {
    const shuffled = numberList.sort(() => 0.5 - Math.random());
    setNumberList(shuffled.slice(0, 9));
    setExtraNumber(shuffled[9]);
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {numberList.map((number) => (
        <Button key={number}>{number}</Button>
      ))}
      <ExtraButton>{extraNumber}</ExtraButton>
    </div>
  );
};

export default NumberPad;
