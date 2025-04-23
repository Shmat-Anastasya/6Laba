import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = (label: string) => {
    if (label === 'C') {
      setInput('');
    } else if (label === '⌫') {
      setInput(input.slice(0, -1));
    } else if (label === '=') {
      try {
        const result = evaluateExpression(input); 
        const fullExpression = `${input} = ${result}`;
        setHistory([...history, fullExpression]);
        setInput(result.toString());
      } catch (error) {
        setInput('Ошибка');
      }
    } else {
      setInput(prevInput => prevInput + label);
    }
  };

  const evaluateExpression = (expr: string): number => {
    const tokens = expr.split(/([\+\-\*\/])/).filter(Boolean);
  
    let intermediate: (string | number)[] = [];
    let current = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextValue = parseFloat(tokens[i + 1]);

        if (operator === '*') {
            current *= nextValue;
        } else if (operator === '/') {
            if (nextValue === 0) {
                throw new Error('Деление на ноль');
            }
            current /= nextValue;
        } else {
            intermediate.push(current);
            intermediate.push(operator);
            current = nextValue;
        }
    }
    intermediate.push(current);

    let total: number = typeof intermediate[0] === 'number' ? intermediate[0] as number : 0;
    for (let i = 1; i < intermediate.length; i += 2) {
        const operator = intermediate[i];
        const nextValue = typeof intermediate[i + 1] === 'number' ? intermediate[i + 1] as number : 0;

        if (operator === '+') {
            total += nextValue;
        } else if (operator === '-') {
            total -= nextValue;
        }
    }

    return total;
};

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    const validKeys = '0123456789+-*/.C=';

    if (validKeys.includes(key)) {
      if (key === 'C') {
        handleButtonClick('C');
      } else if (key === '=') {
        handleButtonClick('=');
      } else {
        handleButtonClick(key);
      }
    } else if (key === 'Backspace') {
      handleButtonClick('⌫');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, history]); 

  return (
    <div className="flex flex-col gap-2 mt-4 items-center">
      <Display value={input} />
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2">
          {['7', '8', '9'].map(label => (
            <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
          ))}
          <Button label="⌫" onClick={() => handleButtonClick('⌫')} />
        </div>
        <div className="flex gap-2">
          {['4', '5', '6'].map(label => (
            <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
          ))}
          <Button label="+" onClick={() => handleButtonClick('+')} />
        </div>
        <div className="flex gap-2">
          {['1', '2', '3'].map(label => (
            <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
          ))}
          <Button label="-" onClick={() => handleButtonClick('-')} />
        </div>
        <div className="flex gap-2">
          {['.', '0'].map(label => (
            <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
          ))}
          <Button label="/" onClick={() => handleButtonClick('/')} />
          <Button label="*" onClick={() => handleButtonClick('*')} />
        </div>
        <div className="flex gap-2">
          <Button label="C" onClick={() => handleButtonClick('C')} />
          <Button label="=" onClick={() => handleButtonClick('=')} />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">История</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;