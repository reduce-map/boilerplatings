const path = require('path');
const http = require('http');
const fs = require('fs');
const { spawn, exec } = require('child_process');

function date() {
  const now = new Date();
  return now.toISOString().substring(0, 10) + ' ' + now.toLocaleTimeString('en-US', { hour12: false });
}

let programs = Array.from({ length: 20 }, (_, i) => {
  let index = i + 1;
  return {
    name: "Bot:" + index,
    path: `./${index}/stetrade-smart_v0.exe`,
    accountCookieFilePath: `./${index}/conf/steam_account.json`,
    localhost: 'localhost',
    port: 3000 + index,
  }
});

const searchStrings = [
  'Не могу получить информацию о валюте, попробуйте перезапустить бота',
  '�',
  'перезапустите бота',
  "Проверка прокси завершилась неудачей, работа невозможна",
  "Сервер подписок не доступен",
  "STEAM ERROR: Не могу получить валюту",
  "Error: SteamGuardMobile"
]

function updateAccountCookieFile(program) {
  fs.readFile(program.accountCookieFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
    } else {
      const accountData = JSON.parse(data);

      delete accountData.cookie;
      delete accountData.sessionId;

      fs.writeFile(program.accountCookieFilePath, JSON.stringify(accountData, null, 2), (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        }
      });
    }
  });
}

function startProgram(program) {
  const executePath = path.resolve(program.path);
  const process = spawn(executePath,
    {
      cwd: path.dirname(executePath),
      shell: true, // run the command inside a shell
      detached: true, // the child process will be independent of the parent
      stdio: 'ignore' // we
    });

  program.childId = process.pid

  process.on('close', (code) => {
    console.log(`[${program.name}] process exited with code ${code}`);
    if (code !== null) {
      updateAccountCookieFile(program);
    }
    program.process = startProgram(program);
    setInterval(() => {
      checkProgram(program);
    }, 60000);
  });

  return process;
}

async function checkProgram(program) {
  if (await checkLogs(`http://${program.localhost}:${program.port}/api/refreshData`, program)) {
    console.log(`[${program.name}] Vse ZBS ${date()}`)
    return
  }

  console.error(`[${program.name}] Health check error ${date()}`);
  killAll(program.childId)
}

async function checkLogs(targetUrl, program) {
  let response
  try {
    response = await fetch(targetUrl, {
      method: 'POST'
    });
  } catch (e) {
    console.log(`[${program.name}]`, e);
  }

  if (!response?.ok) {
    return false
  }
  
  const data = await response.json();
  if (data && data.logs_array) {
    for (let log of data.logs_array) {
      for (const searchString of searchStrings) {
        if (log.includes(searchString)) {
          console.log(`Найдена фраза в логах: ${searchString} ${date()}`);
          return false
        }
      }
    }
  }
  return true
}

function killAll(pid, signal = 'SIGTERM') {
  if (process.platform == "win32") {
    exec(`taskkill /PID ${pid} /T /F`, (error, stdout, stderr) => {
      if (error) {
        console.log("error: " + error.message)
      }
    })
  } else {
    process.kill(-pid, signal)
  }
}

programs.forEach((program) => {
  program.process = startProgram(program);

  setInterval(() => {
    checkProgram(program);
  }, 120000);
});
