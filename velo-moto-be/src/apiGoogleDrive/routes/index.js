const basicRoutes = require('./basic');
const routesDecoration = require('./routes-decoration');

module.exports = googleDriver => (() => (
  {
    ...routesDecoration(basicRoutes(googleDriver))
  }))()
