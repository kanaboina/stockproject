import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function useSales(props) {
  const { response, coinName, setResponse } = props;
  const [balance, setBalance] = useState(1000000);
  const [coins, setCoins] = useState(0);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [canFetch, setCanFetch] = useState(0);
    const { isAuthenticated, user } = useAuth0();
  const filterDataByEmail = (email) => {
    if (!response) {
      console.log("Response not loaded yet please wait");
      return -1;
    }
    for (let i = 0; i < response.length; i++) {
      if (response[i]["emailId"] === email) return i;
    }
    addNewUserIntoDatabase(email);
    return response.length;
  };

  const updateData = (data, newBalance) => {
    return { ...data, balance: newBalance };
  };

  const addOrUpdateCoin = (userData, purchasedCost, purchasedAmount) => {
    if (!userData.coins[coinName.toLowerCase()]) {
      userData.coins[coinName.toLowerCase()] = {
        quantity: [purchasedAmount],
        purchaseCost: [purchasedCost],
      };
      updateDataInDatabase(userData);
      return;
    }
    userData.coins[coinName.toLowerCase()].purchaseCost.push(purchasedCost);
    userData.coins[coinName.toLowerCase()].quantity.push(purchasedAmount);
    updateDataInDatabase(userData);
  };

  const addNewUserIntoDatabase = (email) => {
    const data = {
      emailId: email,
      balance: 1000000,
      coins: {},
    };
    axios
      .post("http://localhost:5000/api/newUser", data)
      .catch((e) => console.log("Error in creating a new user", e));
  };

  const updateDataInDatabase = (data) => {
    console.log("Update data in database called");
    axios
      .post("http://localhost:5000/api/updateData", data)
      .catch((e) =>
        console.log("Failed to update data into database due to ", e)
      );
    console.log("RESPONSE updateDataInDatabase ", data);
    setResponse();
    setCanFetch(canFetch + 1); 
    console.log("Exited");
  };
  const onBuyingCoin = () => {
    if (!isAuthenticated) {
      alert("Login first before buying fool");
      return;
    }
    if ((input1 || input2) && !isNaN(input1) && !isNaN(input2)) {
      const input1Value = parseFloat(input1);
      const input2Value = parseFloat(input2);
      if (balance < input2Value) {
        alert("Not enough Balance fool");
      } else {
        const index = filterDataByEmail(user.email);
        const newData = updateData(response[index], balance - input2Value);
        addOrUpdateCoin(newData, parseFloat(input2), parseFloat(input1));
        setBalance((prevBalance) => {
          const newBalance = prevBalance - input2Value;
          setCoins((prevCoins) => prevCoins + input1Value);
          return newBalance;
        });
      }
    } else {
      alert("Enter valid numerical values");
    }
  };
  const onSellingCoin = () => {
    if (!isAuthenticated) {
      alert("Login first before selling fool");
      return;
    }
    if ((input1 || input2) && !isNaN(input1) && !isNaN(input2)) {
      const input1Value = parseFloat(input1);
      const input2Value = parseFloat(input2);
      if (coins < input1Value) {
        alert("Not enough coins to sell");
      } else {
        const index = filterDataByEmail(user.email);
        const newData = updateData(response[index], balance + input2Value);
        addOrUpdateCoin(newData, -input2Value, -input1Value);
        setBalance((prevBalance) => {
          const newBalance = prevBalance + input2Value;
          setCoins((prevCoins) => prevCoins - input1Value);
          return newBalance;
        });
      }
    } else {
      alert("Enter valid numerical values");
    }
  };

  return [
    balance,
    coins,
    setInput1,
    setInput2,
    input1,
    onBuyingCoin,
    onSellingCoin,
    input2,
    canFetch
  ];
}

export default useSales;
