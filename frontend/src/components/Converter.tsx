import { useState } from "react";
import axios from "axios";
import style from "./Converter.module.css";
import { FaRegGrinWink } from "react-icons/fa";

const Converter = () => {
  const [value, setValue] = useState("");
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [result, setResult] = useState((0.0).toPrecision(3));
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Create a reges that detects if a value has numbers from 1 to 9
  const numbersRegEx = /^(?!0)\d+$/;
  const regEx = /^[0-9]*\.?[0-9]*$/;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (regEx.test(inputValue)) {
      setError("");
      if (value[0] === "0") {
        setValue(inputValue);
      }
      setValue(inputValue);
    } else {
      setError("Solo se permiten números y un solo punto para los decimales");
    }
  };

  const handleFirstCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setError("");
    setFirstCurrency(e.target.value);
  };

  const handleSecondCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setError("");
    setSecondCurrency(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!numbersRegEx.test(value)) {
      setError("Ingresa un valor");
      return;
    } else {
      setError("");
    }
    const form = e.target as HTMLFormElement;
    const inputValue = (form.elements[0] as HTMLInputElement).value;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://currencyconverterapi-xyih.onrender.com/convert",
        {
          fromCurrency: firstCurrency,
          toCurrency: secondCurrency,
          amount: inputValue,
        }
      );
      setResult(
        response.data.convertedAmount
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
    } catch (error) {
      console.error("Error in Axios request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.converter}>
      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}
      {loading ? (
        <div className={style.loading}>
          <h4>Cargando...</h4>
        </div>
      ) : (
        <div className={style.formContainer}>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={style.inputContainer1}>
                <input
                  className={style.input}
                  type="text"
                  value={value}
                  placeholder={currencies[firstCurrency]}
                  onChange={handleChange}
                />
                <select
                  value={firstCurrency}
                  onChange={handleFirstCurrencyChange}
                >
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
                <select
                  value={secondCurrency}
                  onChange={handleSecondCurrencyChange}
                >
                  {Object.keys(currencies).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <input className={style.submit} type="submit" value="Convertir" />
            </form>
          </div>
          <div className={style.message}>
            <p>
              El servidor se apaga temporalmente por inactividad y podría tardar
              un par de minutos en reactivarse pero después de la primera
              solicitud podrás hacer conversiones casi al instante.
            </p>
            <span>
              <FaRegGrinWink />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Converter;
