import { collection, query, where, orderBy, Timestamp, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Shift, Click } from '../types';

interface ClicksByShift {
  [key: string]: Click[];
}

const fetchEmployeeData = async (employeeId: string): Promise<string> => {
  try {
    // Handle the case where employeeId already includes the -NS suffix
    const normalizedId = employeeId.endsWith('-NS') ? employeeId : `${employeeId}-NS`;
    const employeeDoc = await getDoc(doc(db, 'employees', normalizedId));
    
    if (employeeDoc.exists()) {
      return employeeDoc.data().name;
    }
    
    // If not found with -NS suffix, try without it
    if (employeeId.endsWith('-NS')) {
      const altEmployeeDoc = await getDoc(doc(db, 'employees', employeeId.replace('-NS', '')));
      if (altEmployeeDoc.exists()) {
        return altEmployeeDoc.data().name;
      }
    }
    
    console.warn(`Employee document not found for ID: ${employeeId}`);
    return employeeId.replace('-NS', ''); // Return the ID without suffix as fallback
  } catch (error) {
    console.error('Error fetching employee:', error);
    return employeeId.replace('-NS', ''); // Return the ID without suffix as fallback
  }
};

export const subscribeToShifts = (
  date: string,
  setShifts: (shifts: Shift[]) => void,
  setLoading: (loading: boolean) => void
) => {
  const selectedDateObj = new Date(date);
  const startOfDay = new Date(selectedDateObj);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDateObj);
  endOfDay.setHours(23, 59, 59, 999);

  const shiftsQuery = query(
    collection(db, 'shifts'),
    where('checkIn', '>=', Timestamp.fromDate(startOfDay)),
    where('checkIn', '<=', Timestamp.fromDate(endOfDay)),
    orderBy('checkIn', 'desc')
  );

  return onSnapshot(shiftsQuery, async (snapshot) => {
    try {
      const shiftsPromises = snapshot.docs.map(async (shiftDoc) => {
        const data = shiftDoc.data();
        const employeeId = data.employeeId;
        const employeeName = employeeId 
          ? await fetchEmployeeData(employeeId)
          : data.employeeName || 'Unknown Employee';

        return {
          id: shiftDoc.id,
          employeeId,
          employeeName,
          status: data.isActive ? 'open' : 'closed',
          clicks: 0,
          checkIn: data.checkIn,
          isActive: data.isActive,
          ...data
        } as Shift;
      });

      const shiftsData = await Promise.all(shiftsPromises);
      setShifts(shiftsData);
    } catch (error) {
      console.error('Error processing shifts:', error);
      setShifts([]);
    } finally {
      setLoading(false);
    }
  });
};

export const subscribeToClicks = (
  setClicksByShift: (clicks: ClicksByShift) => void
) => {
  const clicksQuery = query(
    collection(db, 'clicks'),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(clicksQuery, (snapshot) => {
    const grouped: ClicksByShift = {};
    snapshot.docs.forEach(doc => {
      const click = { id: doc.id, ...doc.data() } as Click;
      grouped[click.shiftId] = grouped[click.shiftId] || [];
      grouped[click.shiftId].push(click);
    });
    setClicksByShift(grouped);
  });
};