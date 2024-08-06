const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const app = express();

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const createLimiter = (maxRequests, windowMs) => rateLimit({
    windowMs: windowMs,
    max: maxRequests,
    handler: (req, res) => {

        res.status(429).json({ message: "Rate limit exceeded. Try again later." });
    }
});

config.paths.forEach(path => {
    const maxRequests = Math.ceil(config.limitWindowMin * 60 * 1000 / path.optimalRequestDelayMs);
    app.use(path.route, createLimiter(maxRequests, config.limitWindowMin * 60 * 1000));
    app.get(path.route, (req, res) => res.status(200).json({ message: "Request successful" }));

    console.info(`Rate limiter applied to ${path.route} with ${maxRequests} requests per ${config.limitWindowMin} minutes`);
    console.info(`Request delay should be: ${formatMilliseconds(path.optimalRequestDelayMs)}`)
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}; link: http://${config.host}:${config.port}`));




function formatMilliseconds(ms){
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