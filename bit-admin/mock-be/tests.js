const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:9090';

let passedTests = 0;
let failedTests = 0;

const logResult = (testName, error = null) => {
    if (error) {
        console.error(`${testName} error`, error.response ? error.response.data : error.message);
        failedTests++;
    } else {
        console.log(`${testName} passed`);
        passedTests++;
    }
};

const testRegister = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/register`, {
            email: `testuser${Number(new Date())}`,
            password: 'password123'
        });
        console.log('/api/register', response.data);
        logResult('/api/register');
    } catch (error) {
        logResult('/api/register', error);
    }
};

const testLogin = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email: 'testuser',
            password: 'password123'
        });
        console.log('/api/login', response.data);
        logResult('/api/login');
    } catch (error) {
        logResult('/api/login', error);
    }
};

const testSave = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/save`, {
            config: { url: '/testdata' },
            data: { key: 'value' }
        });
        console.log('/api/save', response.data);
        logResult('/api/save');
    } catch (error) {
        logResult('/api/save', error);
    }
};

const testGet = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/testdata`);
        console.log('/testdata', response.data);
        logResult('/testdata');
    } catch (error) {
        logResult('/testdata', error);
    }
};

const testUpdate = async () => {
    try {
        const response = await axios.put(`${BASE_URL}/api/update`, {
            fileName: 'testdata',   // Убедитесь, что этот файл существует
            propertyName: 'newKey', // Убедитесь, что это имя существует
            newValue: 'newValue'
        });
        console.log('/api/update', response.data);
        logResult('/api/update');
    } catch (error) {
        logResult('/api/update', error);
    }
};

const testDelete = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/delete`, {
            data: {
                fileName: 'testdata',   // Убедитесь, что этот файл существует
                propertyName: 'newKey'  // Убедитесь, что это имя существует
            }
        });
        console.log('/api/delete', response.data);
        logResult('/api/delete');
    } catch (error) {
        logResult('/api/delete', error);
    }
};

const runTests = async () => {
    await testRegister();
    await testLogin();
    await testSave();
    await testGet();
    await testUpdate();
    await testDelete();

    console.log(`Tests passed: ${passedTests}`);
    console.log(`Tests failed: ${failedTests}`);

    if (failedTests > 0) {
        process.exit(1);
    } else {
        process.exit(0);
    }
};

await runTests();
console.log('Tests completed');
