import React, { useState } from 'react';
import Calculator from './components/Calculator';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors flex flex-col justify-center items-center`}>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-xl font-bold text-center mt-1">Калькулятор</h1>
        <p className="mt-1 text-center">С помощью этой штуки ты можешь производить свои гениальные расчеты</p> 
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`mt-2 p-2 rounded ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-black'} hover:opacity-80 transition`}
        >
          {darkMode ? 'Светлая тема' : 'Темная тема'}
        </button>
      </div>
      <Calculator />
    </div>
  );
};

export default App;