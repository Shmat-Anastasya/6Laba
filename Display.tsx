import React from 'react';

interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 text-right text-2xl rounded text-black dark:text-white" style={{ minWidth: '280px', minHeight: '64px' }}>
      {value}
    </div>
  );
};

export default Display;