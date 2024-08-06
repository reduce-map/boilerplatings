
/**
 * Returns a string in the format of a Steam header date string.
 * @example 'Mon, 01 Jan 2000 00:00:00 GMT'
 */
export function getSteamDateString(date:Date = new Date()): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const day = days[date.getUTCDay()];
    const dateNum = String(date.getUTCDate()).padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    return `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
  }
  

  