import { useState } from "react";
import axios from "axios";
import style from "./Converter.module.css";

const Converter = () => {
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [result, setResult] = useState((0.0).toPrecision(3));
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const currencies: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    ARS: "$",
    CLP: "$",
    MXN: "MX$",
    COP: "$",
    BRL: "R$",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    INR: "₹",
    RUB: "₽",
    ZAR: "R",
    HKD: "HK$",
    SGD: "S$",
    NZD: "NZ$",
    KRW: "₩",
    SEK: "kr",
    NOK: "kr",
    TRY: "₺",
  };

  const handleFirstCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFirstCurrency(e.target.value);
  };

  const handleSecondCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSecondCurrency(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputValue = (form.elements[0] as HTMLInputElement).value;

    try {
      const response = await axios.post("http://localhost:8000/convert", {
        fromCurrency: firstCurrency,
        toCurrency: secondCurrency,
        amount: inputValue,
      });

      console.log(response.data.convertedAmount.toFixed(2));
      setResult(response.data.convertedAmount.toFixed(2));
    } catch (error) {
      console.error("Error in Axios request:", error);
    }
  };

  return (
    <div className={style.converter}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputContainer1}>
          <input
            className={style.input}
            type="text"
            placeholder={currencies[firstCurrency]}
          />
          <select value={firstCurrency} onChange={handleFirstCurrencyChange}>
            {Object.keys(currencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className={style.inputContainer2}>
          <input
            className={style.input + " " + style.output}
            type="text"
            readOnly
            value={currencies[secondCurrency] + " " + result}
          />
          <select value={secondCurrency} onChange={handleSecondCurrencyChange}>
            {Object.keys(currencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <input className={style.submit} type="submit" value="Convert" />
      </form>
    </div>
  );
};

export default Converter;
