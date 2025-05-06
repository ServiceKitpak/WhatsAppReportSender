export interface Shift {
  id: string;
  employeeId?: string;
  employeeName: string;
  status: 'open' | 'closed';
  clicks: number;
  checkIn: string;
  isActive: boolean;
}

export interface Employee {
  name: string;
  posts: number;
  isDayOff: boolean;
}

export interface ReportData {
  date: string;
  day: string;
  employees: Employee[];
  totalPosting: number;
  totalActive: number;
  totalDayOff: number;
}

export interface Click {
  id: string;
  shiftId: string;
  timestamp: string;
}