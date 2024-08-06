const ftp = require('ftp');
const client = new ftp();
const option = require('../config-ftp').connect;

const bindClient = key => client[key].bind(client);

const nameOfMethods = [
  'get', 'put', 'append',
  'rename', 'logout', 'delete',
  'cwd', 'abort', 'site', 'status',
  'ascii', 'binary','list',
  'mkdir', 'rmdir',
]

const bindMethods = nameOfMethods.reduce((prev, cur) => ({
  ...prev,
  [cur]: bindClient(cur)
}),{})

const on = new Promise(resolve => {
  client.on('ready', () => resolve())
}).then(() => ({
  ...bindMethods,
  end: client.end.bind(client),
  handler: (callback) => (err, items) => {
      callback(items, err);
    }
}));

client.connect(option);

module.exports = on;

