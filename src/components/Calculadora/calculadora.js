import React, { useState } from 'react';
import './style.scss'
function Calculator() {
  const [display, setDisplay] = useState('0');
  const [historial, setHistorial] = useState([])
  const handleButtonClick = (value) => {
    setDisplay((prevDisplay) => prevDisplay === '0' ? value : prevDisplay + value);
  };

  const handleCalculate = () => {
    try {
      const result = eval(display);
      setDisplay(result.toString());
      setHistorial(historial.concat(`${display} = ${result}`).reverse());
    } catch (error) {
      setDisplay('Error');
      console.log(error);
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };
  const handleAClear = () => {
    handleClear();
    setHistorial([]);
  }

  return (
    <div className="calculator">
      <div className="display">{display}
      <div className='display historial'>
      {
      historial.map((operation) => [
        <div className="historial-item">
          {operation}
        </div>
      ])
     }
      </div>
      </div>
      <div className="buttons">
        <div className="button-row">
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
          <button onClick={handleCalculate}>=</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('+')} className='operator'>+</button>
          <button onClick={() => handleButtonClick('-')} className='operator'>-</button>
          <button onClick={() => handleButtonClick('*')} className='operator'>*</button>
          <button onClick={() => handleButtonClick('/')} className='operator'>/</button>
        </div>
        <div className="button-row">
          <button onClick={handleClear} className='operator AC'>Clear</button>
          <button onClick={handleAClear} className='operator AC'>AC</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
