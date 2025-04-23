import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="flex items-center justify-center w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition text-black dark:text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;