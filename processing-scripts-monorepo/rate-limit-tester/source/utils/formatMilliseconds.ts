export function formatMilliseconds(ms:number):string{
    let milliseconds = ms % 1000;
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    let days = Math.floor(ms / (1000 * 60 * 60 * 24));

    let result = [];

    if (days > 0) {
        result.push(days + 'd');
    }
    if (hours > 0) {
        result.push(hours + 'h');
    }
    if (minutes > 0) {
        result.push(minutes + 'm');
    }
    if (seconds > 0) {
        result.push(seconds + 's');
    }
    if (milliseconds > 0 || result.length === 0) {
        result.push(milliseconds + 'ms');
    }

    return result.join(' ');
}