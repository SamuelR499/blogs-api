const express = require('express');
const errorMiddleware = require('./middlewares/errorMidleware');
const authRouter = require('./routes/authRouter');
const createUserRouter = require('./routes/createUserRouter');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/user', createUserRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
