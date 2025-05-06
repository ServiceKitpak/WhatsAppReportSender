import React, { useState, useEffect } from 'react';
import { Shift, Employee, ReportData, Click } from './types';
import { subscribeToShifts, subscribeToClicks } from './api/shiftsApi';
import {
  getISODateString,
  formatDateForDisplay,
  getDayFromDate
} from './utils/reportUtils';

// Components
import DateSelector from './components/DateSelector';
import ShiftsList from './components/ShiftsList';
import ManualEmployeeInput from './components/ManualEmployeeInput';
import EmployeeList from './components/EmployeeList';
import ReportPreview from './components/ReportPreview';

interface ClicksByShift {
  [key: string]: Click[];
}

const App: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<string>(getISODateString());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clicksByShift, setClicksByShift] = useState<ClicksByShift>({});
  const [reportData, setReportData] = useState<ReportData>({
    date: formatDateForDisplay(selectedDate),
    day: getDayFromDate(selectedDate),
    employees: [],
    totalPosting: 0,
    totalActive: 0,
    totalDayOff: 0
  });

  // Subscribe to shifts and clicks
  useEffect(() => {
    const unsubscribeShifts = subscribeToShifts(selectedDate, setShifts, setIsLoading);
    const unsubscribeClicks = subscribeToClicks(setClicksByShift);

    return () => {
      unsubscribeShifts();
      unsubscribeClicks();
    };
  }, [selectedDate]);

  // Update shifts with click counts
  useEffect(() => {
    const updatedShifts = shifts.map(shift => ({
      ...shift,
      clicks: clicksByShift[shift.id]?.length || 0
    }));
    setShifts(updatedShifts);
  }, [clicksByShift]);

  // Update report data when employees or date changes
  useEffect(() => {
    let totalPosting = 0;
    let totalActive = 0;
    let totalDayOff = 0;

    employees.forEach(emp => {
      if (emp.isDayOff) {
        totalDayOff++;
      } else {
        totalPosting += emp.posts;
        totalActive++;
      }
    });

    setReportData({
      date: formatDateForDisplay(selectedDate),
      day: getDayFromDate(selectedDate),
      employees,
      totalPosting,
      totalActive,
      totalDayOff
    });
  }, [employees, selectedDate]);

  // Handler for adding employee to report
  const handleAddEmployee = (employee: Employee) => {
    // Check if employee is already in the list
    const exists = employees.some(emp => emp.name === employee.name);
    if (exists) {
      alert(`${employee.name} is already in the report.`);
      return;
    }
    
    setEmployees(prev => [...prev, employee]);
  };

  // Handler for removing employee from report
  const handleRemoveEmployee = (index: number) => {
    setEmployees(prev => prev.filter((_, i) => i !== index));
  };

  // Handler for date change
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsLoading(true);
    setEmployees([]); // Clear employees when date changes
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-600">WhatsApp Report Sender</h1>
            <p className="text-gray-600 mt-1">Generate and send closing reports via WhatsApp</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <DateSelector date={selectedDate} onDateChange={handleDateChange} />
              <ShiftsList 
                shifts={shifts} 
                isLoading={isLoading} 
                onAddEmployee={handleAddEmployee}
              />
              <ManualEmployeeInput onAddEmployee={handleAddEmployee} />
            </div>
            
            <div>
              <EmployeeList 
                employees={employees} 
                onRemoveEmployee={handleRemoveEmployee}
              />
              <ReportPreview reportData={reportData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;