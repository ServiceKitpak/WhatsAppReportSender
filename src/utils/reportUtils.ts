import { Employee, ReportData } from '../types';

export const generateReportTemplate = (): string => {
  return `=========================
*CLOSING* *REPORT*
----------------------------------------
*Date:* 
*Day:* 
----------------------------------------
===========================
*TOTAL* *POSTING:* 0
===========================
*Total* *Active:* 0
===========================
*Total* *Day Off:* 0
===========================`;
};

export const formatReportWithEmployees = (reportData: ReportData): string => {
  let report = generateReportTemplate();
  
  // Update date and day
  report = report.replace(/\*Date:\* .*/, `*Date:* ${reportData.date}`);
  report = report.replace(/\*Day:\* .*/, `*Day:* ${reportData.day}`);
  
  // Add employees
  let employeeEntries = '';
  reportData.employees.forEach(emp => {
    employeeEntries += `* ${emp.name}: ${emp.isDayOff ? "Day Off" : emp.posts}\n`;
  });
  
  // Insert employee entries before the first total
  if (employeeEntries) {
    report = report.replace(/===========================\n\*TOTAL\* \*POSTING:\*/, `===========================\n${employeeEntries}*TOTAL* *POSTING:*`);
  }
  
  // Update totals
  report = report.replace(/\*TOTAL\* \*POSTING:\* \d+/, `*TOTAL* *POSTING:* ${reportData.totalPosting}`);
  report = report.replace(/\*Total\* \*Active:\* \d+/, `*Total* *Active:* ${reportData.totalActive}`);
  report = report.replace(/\*Total\* \*Day Off:\* \d+/, `*Total* *Day Off:* ${reportData.totalDayOff}`);
  
  return report;
};

export const sendViaWhatsApp = (reportText: string): void => {
  const encodedText = encodeURIComponent(reportText);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  window.open(whatsappUrl, "_blank");
};

export const getCurrentDateString = (): string => {
  const today = new Date();
  return today.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
};

export const getCurrentDayString = (): string => {
  const today = new Date();
  return today.toLocaleDateString('en-GB', { 
    weekday: 'long' 
  });
};

export const getISODateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

export const formatDateForDisplay = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
};

export const getDayFromDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', { 
    weekday: 'long' 
  });
};