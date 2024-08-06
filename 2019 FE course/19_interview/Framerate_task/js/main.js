/**
 * @param frames number
 * @return string
 */
function format (frameNumber) {
    var frames = frameNumber % 30;

    var seconds = (( frameNumber - frames ) / 30) % 60;
    seconds = (seconds > 0) ? seconds : 0;

    var minutes = ((frameNumber - seconds * 30 - frames) / 1800 ) % 60;
    minutes = (minutes > 0) ? minutes : 0;

    var hours = ((frameNumber - minutes * 60 * 30 - seconds * 30 - frames) / 21600 ) % 12;
    hours = (hours > 0) ? hours : 0;

    // return hours + " : " + minutes + " : " + seconds + " : " + frames

    console.log(hours + " : " + minutes + " : " + seconds + " : " + frames);
}

format(0);
format(29);
format(30);
format(1799);
format(1800);
format(1801);
format(3597);
format(3598);
format(17981);
format(17982);
format(19781);
format(19782);

// it('should format 0 to 00:00:00;00');
// it('should format 29 to 00:00:00;29');
// it('should format 30 to 00:00:01;00');
// it('should format 1799 to 00:00:59;29');
// it('should format 1800 to 00:01:00;02');
// it('should format 1801 to 00:01:00;03');
// it('should format 3597 to 00:01:59;29');
// it('should format 3598 to 00:02:00;02');
// it('should format 3598 to 00:02:00;02');
// it('should format 17981 to 00:09:59;29');
// it('should format 17982 to 00:10:00;00');
// it('should format 19781 to 00:10:59;29');
// it('should format 19782 to 00:11:00;02');
