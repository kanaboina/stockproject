import React, { useEffect, useState } from "react";
import SelectButton from "./SelectButton";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import useSales from "../hooks/useSales";
import { useAuth0 } from "@auth0/auth0-react";

function BuyCoin(props) {
  const { isAuthenticated } = useAuth0();
  const { cost, coinName } = props;
  const [response, setResponse] = useState();

  const [
    balance,
    coins,
    setInput1,
    setInput2,
    input1,
    onBuyingCoin,
    onSellingCoin,
    input2,
    canFetch,
  ] = useSales({ response, coinName, setResponse });
  const serverUrl = "http://localhost:5000/api";

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [canFetch]);

  const fetchData = () => {
    if (!isAuthenticated) return;
    axios
      .get(serverUrl)
      .then((response) => setResponse(response.data))
      .then(() => console.log("Fetched data"))
      .catch((e) => console.log("Unable to fetch data due to ", e));
  };
  return (
    <div
      style={{
        height: 497.6,
        width: 996.8,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(22, 24, 32)",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span>
          Balance Amount :{" "}
          {response ? (
            balance
          ) : (
            <CircularProgress
              style={{ color: "gold" }}
              size={25}
              thickness={3}
            />
          )}
        </span>
        <span>
          Coins Bought :{" "}
          {response ? (
            coins
          ) : (
            <CircularProgress
              style={{ color: "gold" }}
              size={25}
              thickness={3}
            />
          )}
        </span>
      </div>
      <div
        style={{
          backgroundColor: "rgb(22, 24, 32)",
          display: "flex",
          flexDirection: "column",
          fontSize: "larger",
          padding: "15px",
        }}
      >
        <span
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Please input the desired quantity of coins to purchase
          <span
            style={{
              padding: "10px",
              display: "flex",
              gap: "30px",
              width: "100%",
              borderBottom: "1px solid white",
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setInput1(e.target.value);
                if (!e.target.value) {
                  setInput2("");
                  return;
                }
                isNaN(+e.target.value)
                  ? setInput2("Enter a valid number")
                  : setInput2(parseFloat(e.target.value) * cost);
              }}
              value={input1}
              style={{
                background: "none",
                border: "1px solid white",
                color: "white",
                width: "320px",
                padding: "5px",
              }}
            ></input>
            <SelectButton selected={true} onClick={onBuyingCoin} bg="green">
              Buy
            </SelectButton>
            <SelectButton selected={true} onClick={onSellingCoin} bg="red">
              Sell
            </SelectButton>
          </span>
        </span>
        <span
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center",
          }}
        >
          Please enter your budget (in ₹)
          <span style={{ display: "flex", gap: "30px", width: "100%" }}>
            <input
              type="text"
              value={input2}
              onChange={(e) => {
                setInput2(e.target.value);
                if (!e.target.value) {
                  setInput1("");
                  return;
                }
                isNaN(+e.target.value)
                  ? setInput1("Enter a valid number")
                  : setInput1(parseFloat(e.target.value) / cost);
              }}
              style={{
                background: "none",
                border: "1px solid white",
                color: "white",
                width: "320px",
                padding: "5px",
              }}
            ></input>
            <SelectButton selected={true} onClick={onBuyingCoin} bg="green">
              Buy
            </SelectButton>
            <SelectButton selected={true} onClick={onSellingCoin} bg={"red"}>
              Sell
            </SelectButton>
          </span>
        </span>
      </div>
    </div>
  );
}

export default BuyCoin;
