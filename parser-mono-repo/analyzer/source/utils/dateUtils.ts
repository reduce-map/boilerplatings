export function getDatesInRange(startDate: Date, endDate: Date, gapInDays: number = 1): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate)); // Clone the date object to avoid references to the same object
      currentDate.setDate(currentDate.getDate() + gapInDays); // Increment by the gap
    }
  
    return dates;
  }
  