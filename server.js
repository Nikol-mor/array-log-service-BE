const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);

const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
app.use(express.json());
app.use(session);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  console.log('devolpment');
  const corsOptions = {
    origin: ['http://localhost:3030', 'http://127.0.0.1:3030'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const logServiceRoutes = require('./api/logService/logService.routes');

const { connectSockets } = require('./services/socket.service');

const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

app.use('/api/logService', logServiceRoutes);

connectSockets(http, session);

const logger = require('./services/logger.service');
const port = process.env.PORT || 3031;
http.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
