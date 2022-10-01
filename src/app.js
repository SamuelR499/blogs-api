const express = require('express');
const errorMiddleware = require('./middlewares/errorMidleware');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);
app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
