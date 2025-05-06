import React from 'react';
import { Shift, Employee } from '../types';
import { Loader2 } from 'lucide-react';

interface ShiftsListProps {
  shifts: Shift[];
  isLoading: boolean;
  onAddEmployee: (employee: Employee) => void;
}

const ShiftsList: React.FC<ShiftsListProps> = ({ shifts, isLoading, onAddEmployee }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading shifts...</span>
        </div>
      </div>
    );
  }

  if (shifts.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p className="text-gray-500 text-center py-4">No shifts found for the selected date</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-medium text-green-600 mb-3">Available Shifts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Closed Shifts</h4>
          {shifts.filter(shift => shift.status === 'closed').length > 0 ? (
            shifts
              .filter(shift => shift.status === 'closed')
              .map(shift => (
                <div key={shift.id} className="border border-gray-200 rounded-md p-3 mb-2 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{shift.employeeName}</span>
                    <span className="text-gray-600">{shift.clicks} clicks</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => onAddEmployee({
                        name: shift.employeeName,
                        posts: shift.clicks,
                        isDayOff: false
                      })}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                    >
                      Add to Report
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-sm">No closed shifts found</p>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Open Shifts</h4>
          {shifts.filter(shift => shift.status === 'open').length > 0 ? (
            shifts
              .filter(shift => shift.status === 'open')
              .map(shift => (
                <div key={shift.id} className="border border-gray-200 rounded-md p-3 mb-2 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{shift.employeeName}</span>
                    <span className="text-gray-600">{shift.clicks} clicks</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => onAddEmployee({
                        name: shift.employeeName,
                        posts: shift.clicks,
                        isDayOff: false
                      })}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                    >
                      Add to Report
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-sm">No open shifts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShiftsList;