const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);
// const { connectSockets } = require('./services/socket.service');

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

// const authRoutes = require('./api/auth/auth.routes');
// const userRoutes = require('./api/user/user.routes');
const logServiceRoutes = require('./api/logService/logService.routes');
// const activitylogRoutes = require('./api/activitylog/activitylog.routes');

const { connectSockets } = require('./services/socket.service');

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/logService', logServiceRoutes);
// app.use('/api/activitylog', activitylogRoutes);
connectSockets(http, session);

// app.get('/api', (req, res) => {
//   console.log('woohooo');
//   res.end();
// });

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
// app.get('/**', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const logger = require('./services/logger.service');
const port = process.env.PORT || 3031;
http.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
