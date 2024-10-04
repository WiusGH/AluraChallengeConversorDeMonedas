import { useState } from "react";
import style from "./Converter.module.css";

interface Currencies {
  USD: string;
  EUR: string;
  ARS: string;
  CLP: string;
  MXN: string;
  COP: string;
  GBP: string;
  JPY: string;
  CNY: string;
  AUD: string;
  CAD: string;
  CHF: string;
  INR: string;
  RUB: string;
  BRL: string;
  ZAR: string;
  HKD: string;
  SGD: string;
  NZD: string;
  KRW: string;
  SEK: string;
  NOK: string;
  TRY: string;
}

const Converter = () => {
  const [firstValue, setFirstValue] = useState((0.0).toPrecision(3));
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [secondValue, setSecondValue] = useState((0.0).toPrecision(3));
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const currencies: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    ARS: "$",
    CLP: "$",
    MXN: "MX$",
    COP: "$",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    INR: "₹",
    RUB: "₽",
    BRL: "R$",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const firstInputValue = (form.elements[0] as HTMLInputElement).value;
    const secondInputValue = (form.elements[2] as HTMLInputElement).value;

    setFirstValue(firstInputValue);
    setSecondValue(secondInputValue);
    console.log(firstValue, firstCurrency, secondValue, secondCurrency);
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
            placeholder={currencies[secondCurrency]}
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
