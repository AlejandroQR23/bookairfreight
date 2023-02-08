import { useState } from "react";
import CustomButton from "./components/CustomButton/CustomButton";
import CustomInput from "./components/CustomInput/CustomInput";
import QuoteCard from "./components/QuoteCard/QuoteCard";
import SelectInput from "./components/SelectInput/SelectInput";

import "./App.css";

const SHIPPING_CHANNELS = ["Air", "Ocean"];

function App() {
  const [startCountry, setStartCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [price, setPrice] = useState("");
  const [shippingChannel, setShippingChannel] = useState(SHIPPING_CHANNELS[0]);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  const adjustRange = (lowerRange, upperRange, max) => {
    if (lowerRange === upperRange) {
      if (upperRange < 10) {
        upperRange++;
      } else {
        lowerRange--;
      }
    }
    return { lowerRange, upperRange };
  };

  const generateRange = (min, max) => {
    const lowerRange = Math.floor(Math.random() * (max - min + 1)) + min;
    const upperRange =
      Math.floor(Math.random() * (max - lowerRange + 1)) + lowerRange;

    return adjustRange(lowerRange, upperRange, max);
  };

  const getDeliveryDays = () => {
    let maxDays = 0;
    let minDays = 0;

    if (shippingChannel === "Air") {
      maxDays = 10;
      minDays = 5;
    } else {
      maxDays = 30;
      minDays = 25;
    }

    return generateRange(minDays, maxDays);
  };

  const getDeliveryDate = () => {
    const { lowerRange, upperRange } = getDeliveryDays();
    const today = new Date();

    const deliveryMinDate = new Date();
    deliveryMinDate.setDate(today.getDate() + lowerRange);
    const deliveryMaxDate = new Date();
    deliveryMaxDate.setDate(today.getDate() + upperRange);

    const dateOptions = {
      month: "short",
      day: "numeric",
    };

    return {
      minDate: deliveryMinDate.toLocaleDateString("en-US", dateOptions),
      maxDate: deliveryMaxDate.toLocaleDateString("en-US", dateOptions),
      minDays: lowerRange,
      maxDays: upperRange,
    };
  };

  const validateData = () => {
    if (!startCountry) {
      setError("Please enter a starting country");
      return false;
    }
    if (!destinationCountry) {
      setError("Please enter a destination country");
      return false;
    }
    if (!price) {
      setError("Please enter a price");
      return false;
    }
    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price");
      return false;
    }

    return true;
  };

  const handleCreateQuote = () => {
    if (!validateData()) {
      setQuote(null);
      return;
    }
    const newQuote = {
      startCountry,
      destinationCountry,
      price: price.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      shippingChannel: shippingChannel.toLowerCase(),
      deliveryDate: getDeliveryDate(),
    };
    setError("");
    setQuote(newQuote);
  };

  return (
    <div className="App">
      <CustomInput
        label="Starting country"
        value={startCountry}
        onChange={setStartCountry}
      />
      <CustomInput
        label="Destination country"
        value={destinationCountry}
        onChange={setDestinationCountry}
      />
      <CustomInput label="Quote price" value={price} onChange={setPrice} />
      <SelectInput
        label="Shipping channel"
        options={SHIPPING_CHANNELS}
        value={shippingChannel}
        onChange={setShippingChannel}
      />
      <CustomButton label="Create quote" onClick={handleCreateQuote} />

      {error && <div className="error">{error}</div>}
      {quote && <QuoteCard quote={quote} />}
    </div>
  );
}

export default App;
