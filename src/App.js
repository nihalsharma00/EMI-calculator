
import './App.css';

import React, { useState } from 'react';

const EmiCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [rateOfInterest, setRateOfInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [emiArray, setEmiArray] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthlyRate = rateOfInterest / 12 / 100;
    const emi = (principalAmount * monthlyRate * (1 + monthlyRate) ** duration) / ((1 + monthlyRate) ** duration - 1);

    const emiArray = [];
    for (let i = 1; i <= duration; i++) {
      emiArray.push({
        month: i,
        amount: emi
      });
    }

    setEmiArray(emiArray);

    const calculation = {
      principalAmount,
      rateOfInterest,
      duration,
      emiArray
    };

    const calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    calculationHistory.push(calculation);
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
    setCalculationHistory(calculationHistory);
  };

  return (
    <>
    <h1>Dynamic Dreamz Task</h1>
      <form onSubmit={handleSubmit}>
        <p>Principal Amount : </p>
        <input
          type="number"
          placeholder="Principal Amount"
          value={principalAmount}
          onChange={e => setPrincipalAmount(e.target.value)}
        />
        
        <p>Rate of Interest : </p>
        <input
          type="number"
          step="0.01"
          placeholder="Rate of Interest"
          value={rateOfInterest}
          onChange={e => setRateOfInterest(e.target.value)}
        />
        <p>Duration (in months) : </p>
        <input
          type="number"
          placeholder="Duration (in months)"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
        <button id="submit" type="submit">Submit</button>
      </form>

      {emiArray.length > 0 && (
        <table border="2" id="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>EMI</th>
            </tr>
          </thead>
          <tbody>
            {emiArray.map(emi => (
              <tr key={emi.month}>
                <td>{emi.month}</td>
                <td>{emi.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {calculationHistory.length > 0 && (
        <div class="history">
          <h3>Calculation History</h3>
          <ul>
            {calculationHistory.map((calculation, index) => (
              <li key={index}>
                <button onClick={() => setEmiArray(calculation.emiArray)}>
                  Search {index + 1}
                </button>
              </li>
              ))}
          </ul>
          </div>
      )}
          

</>

)}

export default EmiCalculator
