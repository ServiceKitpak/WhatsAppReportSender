import React, { useState } from 'react';
import { Employee } from '../types';

interface ManualEmployeeInputProps {
  onAddEmployee: (employee: Employee) => void;
}

const ManualEmployeeInput: React.FC<ManualEmployeeInputProps> = ({ onAddEmployee }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeePosts, setEmployeePosts] = useState('');
  const [isDayOff, setIsDayOff] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeName || (!employeePosts && !isDayOff)) {
      alert('Please fill in all required fields');
      return;
    }

    onAddEmployee({
      name: employeeName,
      posts: isDayOff ? 0 : parseInt(employeePosts),
      isDayOff
    });

    // Reset form
    setEmployeeName('');
    setEmployeePosts('');
    setIsDayOff(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-medium text-green-600 mb-3">Add Employee Manually</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <input
            id="employee-name"
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            placeholder="Enter employee name"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="employee-posts" className="block text-sm font-medium text-gray-700 mb-1">
              Posts/Clicks Count
            </label>
            <input
              id="employee-posts"
              type="number"
              min="0"
              value={employeePosts}
              onChange={(e) => setEmployeePosts(e.target.value)}
              disabled={isDayOff}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${isDayOff ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter number of posts"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="day-off"
              type="checkbox"
              checked={isDayOff}
              onChange={(e) => {
                setIsDayOff(e.target.checked);
                if (e.target.checked) {
                  setEmployeePosts('');
                }
              }}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="day-off" className="ml-2 block text-sm text-gray-700">
              Mark as Day Off
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add to Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualEmployeeInput;