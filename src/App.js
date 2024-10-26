import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    
    if (['+', '-', '*', '/'].includes(value) && input === '') {
      return;
    }

    
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(input.slice(-1))) {
      return;
    }

    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };



  
  const handleCalculate = async () => {
    try {
      const operators = ['+', '-', '*', '/'];
      let operator;
      for (const op of operators) {
        if (input.includes(op)) {
          operator = op;
          break;
        }
      }

      if (!operator || input.endsWith(operator)) {
        setResult('Error');
        return;
      }

      const [a, b] = input.split(operator).map(Number);

      if (isNaN(a) || isNaN(b)) {
        setResult('Error');
        return;
      }

      let response;

      switch (operator) {
        case '+':
          response = await axios.get('http://localhost:5088/add', { params: { a, b } });
          break;
        case '-':
          response = await axios.get('http://localhost:5088/subtract', { params: { a, b } });
          break;
        case '*':
          response = await axios.get('http://localhost:5088/multiply', { params: { a, b } });
          break;
        case '/':
          response = await axios.get('http://localhost:5088/divide', { params: { a, b } });
          break;
        default:
          setResult('Error');
          return;
      }

      setResult(response.data);
    } catch (error) {
      setResult('Error');
    }
  };





  return (
    <div className="App">
      <div className="calculator">
        <input
          type="text"
          value={input}
          readOnly
          placeholder="Enter calculation"
        />
        <div className="buttons">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
            <button key={num} onClick={() => handleButtonClick(num)}>{num}</button>
          ))}
          {['+', '-', '*', '/'].map((op) => (
            <button key={op} onClick={() => handleButtonClick(op)}>{op}</button>
          ))}
          <button onClick={handleClear}>C</button>
          <button className='Equal' onClick={handleCalculate}>=</button>
        </div>
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

export default App;
