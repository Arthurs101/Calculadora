import React, { useState , useEffect} from 'react';
import './style.scss'
function Calculator() {
  const operators = ['+','-','*','/','%']
  const [display, setDisplay] = useState('0');
  const [number, setNumber] = useState('');
  const [historial, setHistorial] = useState([])
  const [darkmode, setDarkMode] = useState(false)
  const [negative, setNegative] = useState(false);
  const charactersToIgnore = ["-"];
  const handleButtonClick = (value) => {
    if(!operators.includes(value)) {
      // Eliminar los caracteres a ignorar
      const filteredStr = number.replace(new RegExp(`[${charactersToIgnore.join("")}]`, "g"), "")
      // Contar la longitud del string filtrado
      const length = filteredStr.length
      console.log(length); // Resultado: 10
      if( length < 9 ) {
        setNumber(number + value)
        setDisplay((prevDisplay) => prevDisplay === '0' ? value : prevDisplay + value)
      }
    }else{
      setNumber('')
      setDisplay((prevDisplay) => prevDisplay === '0' ? value : prevDisplay + value)
    }
    
      
  };

  const handleCalculate = () => {
    try {
      const result = eval(display);
      setDisplay(result.toPrecision(9).toString())
      setHistorial(historial.concat(`${display} = ${result.toPrecision(9)}`).reverse())
    } catch (error) {
      setDisplay('Error')
      console.log(error)
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };
  const handleAClear = () => {
    handleClear();
    setHistorial([]);
  }
  const handleButtonTheme = () => {
    setDarkMode(!darkmode);
  }

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkmode])

  const handleNegative = () => {
    setNegative((prevNegative) => !prevNegative)
  
    if (number !== '') {
      const newNumber = negative ? number.slice(1) : `-${number}`
      setNumber(newNumber);
      setDisplay((prevDisplay) => (prevDisplay === '0' ? newNumber : prevDisplay.replace(number, newNumber)))
    }
  }
  
  return (
    <div className={`calculator ${darkmode? 'dark' : '' }`}>
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
          <button onClick={handleNegative} className="operator">
  +/-
</button>
        </div>
        <div className="button-row">
          <button onClick={handleClear} className='operator AC'>Clear</button>
          <button onClick={handleAClear} className='operator AC'>AC</button>
          <button onClick={() => handleButtonClick('%')} className='operator'>%</button>
          <button onClick={() => handleButtonTheme()} className='theme'>{darkmode? 'dark':'light'}</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator
