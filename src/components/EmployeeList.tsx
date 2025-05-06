import React from 'react';
import { Employee } from '../types';

interface EmployeeListProps {
  employees: Employee[];
  onRemoveEmployee: (index: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onRemoveEmployee }) => {
  if (employees.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-medium text-green-600 mb-3">Employees in Report</h3>
      
      <div className="divide-y divide-gray-200">
        {employees.map((employee, index) => (
          <div key={index} className="py-3 flex justify-between items-center group">
            <div>
              <span className="font-medium">{employee.name}</span>
              <span className="ml-2 text-gray-600">
                {employee.isDayOff ? 'Day Off' : `${employee.posts} posts`}
              </span>
            </div>
            <button
              onClick={() => onRemoveEmployee(index)}
              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
              aria-label="Remove employee"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;