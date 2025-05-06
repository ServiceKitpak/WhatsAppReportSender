import React from 'react';

interface DateSelectorProps {
  date: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, onDateChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-medium text-green-600 mb-3">Select Date</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700 mb-1">
            Select Report Date
          </label>
          <input
            id="date-picker"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;