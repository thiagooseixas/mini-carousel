const http = require('http');

const routes = require('./src/routes/routes');
const router = require('./src/routes/router');

const settings = require('./settings');

const server = http.createServer(async (req, res) => {
  await router(req, res, routes);
});

server.listen(settings.config.PORT, () => {
  console.log('Server is listening on: http://localhost:' + settings.config.PORT);
});
