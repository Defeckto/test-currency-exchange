import React, {useEffect, useState} from "react";
import CurrencyRow from "./components/CurrencyRow/CurrencyRow";
import './App.css'
import Header from "./components/CurrencyRow/Header";


const myHeaders = new Headers();
myHeaders.append("apikey", "JE9mnltswKVCRNwIgdfiClezst3O43Sv");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest"



function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [headerExchangeRateUSD, setHeaderExchangeRateUSD] = useState(1);
  const [headerExchangeRateEUR, setHeaderExchangeRateEUR] = useState(1);
  let toAmount;
  let fromAmount;
  
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(`${BASE_URL}?symbols=USD%2CEUR&base=UAH`, requestOptions)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.rates)[0];
          setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
          setFromCurrency(firstCurrency);
          setToCurrency(data.base);
          setExchangeRate(data.rates[firstCurrency])
        })
  }, []);
  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[toCurrency])
        });
    }
  }, [fromCurrency, toCurrency])
  
  useEffect(() => {
    fetch(`${BASE_URL}?symbols=UAH&base=USD`, requestOptions)
      .then(res => res.json())
      .then(data => {
        setHeaderExchangeRateUSD(data.rates['UAH'])
      });
  })
  useEffect(() => {
    fetch(`${BASE_URL}?symbols=UAH&base=EUR`, requestOptions)
      .then(res => res.json())
      .then(data => {
        setHeaderExchangeRateEUR(data.rates['UAH'])
      });
  })
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false);
  }
  return (
    <div>
      <h1 className="title">Currency exchange</h1>
      <Header
        headerExchangeRateUSD={headerExchangeRateUSD}
        headerExchangeRateEUR={headerExchangeRateEUR}
      />
      <CurrencyRow
        typeInput={'number'}
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount = {fromAmount}
        onChangeAmount={ handleFromAmountChange}
      />
      <div className="equals">
        =
      </div>
      <CurrencyRow
        typeInput = {'number'}
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount = {toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
