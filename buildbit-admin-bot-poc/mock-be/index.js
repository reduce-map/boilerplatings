const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin(origin, callback) {
        callback(null, true);
    }
}));
app.use(express.urlencoded({ extended: true }));

const USERS_FILE = path.join(__dirname, 'MOCK_DATA/users.json');
const LOG_FILE = path.join(__dirname, 'error.log');
const CLIENT_ROLE = 'client';

// Создаем лог файл, если его нет
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '');
}

const logError = (message, details) => {
    const errorLog = `${new Date().toISOString()} - ${message}: ${JSON.stringify(details)}\n`;
    fs.appendFileSync(LOG_FILE, errorLog);
};

const generateToken = () => crypto.randomBytes(16).toString('hex');

const pathToFile = fileName => path.join(__dirname, `MOCK_DATA/${fileName}.json`);
const formatFileName = name => name.split('/').filter(v => v).join('_');

const saveFile = (fileName, fileData, res) => {
    const filePath = pathToFile(fileName);
    console.log(`Saving to: ${filePath}`); // Debug statement
    fs.writeFile(filePath, JSON.stringify(fileData, null, 4), err => {
        if (err) {
            logError('Error saving file', { error: err.message, filePath });
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        } else {
            res.json({ status: 'successful' });
            console.log('Saved');
        }
    });
};

const getFileAndPropertyNames = ({ url }) => {
    const isQuery = url.match(/\?/);
    const fileName = formatFileName(isQuery ? `${url.slice(0, isQuery.index)}` : url);
    const propertyName = isQuery ? `${url.slice(isQuery.index + 1)}` : '.';

    return { fileName, propertyName };
};

const formartFrontEndBaseUrl = url => url.replace(/\/.*\/v1.0/, '');

const loadUsers = () => {
    console.log(`Loading users from: ${USERS_FILE}`); // Debug statement
    if (!fs.existsSync(USERS_FILE)) {
        console.log(`File does not exist: ${USERS_FILE}`); // Debug statement
        return { ".": { data: [] } };
    }
    console.log(`File exists: ${USERS_FILE}`); // Debug statement
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
};

const saveUsers = users => {
    console.log(`Saving users to: ${USERS_FILE}`); // Debug statement
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 4));
};

app.post('/api/save', (req, res) => {
    if (!Object.keys(req.body).length) return;

    const { fileName, propertyName } = getFileAndPropertyNames(req.body.config);
    const pathFile = pathToFile(fileName);
    const isFileExist = fs.existsSync(pathFile);

    if (!isFileExist) return saveFile(fileName, { [propertyName]: req.body }, res);

    const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));

    fileData[propertyName] = req.body;
    saveFile(fileName, fileData, res);
});

app.get('*', (req, res) => {
    try {
        if (!Object.keys(req.query).length) {
            const [fileName] = req.url.split('?');
            const pathFile = pathToFile(formatFileName(formartFrontEndBaseUrl(fileName)));
            console.log(`GET request path: ${pathFile}, URL: ${req.url}, Exists: ${fs.existsSync(pathFile)}`); // Debug statement
            if (fs.existsSync(pathFile)) {
                const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
                return res.json(fileData['.']?.data ?? {});
            } else {
                logError('File does not exist', { pathFile, url: req.url });
                return res.status(500).json({ status: 'error', message: `File does not exist: ${pathFile}` });
            }
        } else {
            const [fileName, propertyName] = req.url.split('?');
            const pathFile = pathToFile(formatFileName(formartFrontEndBaseUrl(fileName)));
            if (!fs.existsSync(pathFile)) {
                logError('File does not exist', { pathFile, url: req.url });
                return res.status(500).json({ status: 'error', message: `File does not exist: ${pathFile}` });
            }
            const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));

            return res.json(fileData[propertyName]?.data ?? {});
        }
    } catch (err) {
        logError('Error in GET request', { error: err.message, url: req.url });
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.post('/api/register', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Invalid registration details' });
        }

        const usersData = loadUsers();
        const users = usersData["."].data;
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        const newUser = {
            id: users.length + 1,
            username,
            password,
            role: CLIENT_ROLE,
            createdAt: new Date()
        };

        users.push(newUser);
        saveUsers(usersData);

        res.json({ status: 'successful', user: newUser });
    } catch (err) {
        logError('Error in /api/register', { error: err.message, body: req.body });
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.post('/api/login', (req, res) => {
    console.log('req /api/login')
    try {
        const { username, password } = req.body;
        const usersData = loadUsers();
        const users = usersData["."].data;
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            logError('Invalid username or password', { username, password});
            return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
        }

        const token = generateToken();
        res.json({ ...user, token });
    } catch (err) {
        logError('Error in /api/login', { error: err.message, body: req.body });
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.put('/api/update', (req, res) => {
    try {
        const { fileName, propertyName, newValue } = req.body;

        if (!fileName || !propertyName || !newValue) {
            logError('Missing parameters', { fileName, propertyName, newValue });
            return res.status(400).json({ status: 'error', message: 'Missing parameters' });
        }

        const pathFile = pathToFile(fileName);
        if (!fs.existsSync(pathFile)) {
            logError('File does not exist', { pathFile, url: req.url });
            return res.status(500).json({ status: 'error', message: `File does not exist: ${pathFile}` });
        }

        const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
        fileData[propertyName] = newValue;
        fs.writeFileSync(pathFile, JSON.stringify(fileData, null, 4)); // Обновить напрямую в файл
        res.json({ status: 'successful' });
    } catch (err) {
        logError('Error in /api/update', { error: err.message, body: req.body });
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.delete('/api/delete', (req, res) => {
    try {
        const { fileName, propertyName } = req.body;

        if (!fileName || !propertyName) {
            logError('Missing parameters', { fileName, propertyName });
            return res.status(400).json({ status: 'error', message: 'Missing parameters' });
        }

        const pathFile = pathToFile(fileName);
        if (!fs.existsSync(pathFile)) {
            logError('File does not exist', { pathFile, url: req.url });
            return res.status(500).json({ status: 'error', message: `File does not exist: ${pathFile}` });
        }

        const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
        delete fileData[propertyName];
        fs.writeFileSync(pathFile, JSON.stringify(fileData, null, 4)); // Обновить напрямую в файл
        res.json({ status: 'successful' });
    } catch (err) {
        logError('Error in /api/delete', { error: err.message, body: req.body });
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


const loadScripts = fileName => /\.js$/.test(fileName) && require(`./routes/${fileName}`)(app);

fs.readdirSync(path.join(__dirname, 'routes')).forEach(loadScripts);

app.listen(9090, () => {
    console.log('http://localhost:9090');
});

// for vue config
module.exports = () => {};
