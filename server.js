import mongoose from "mongoose";    
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mainRouter from './routers/main.js';
import Question from './models/question.js';
import Answer from './models/answer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await mongoose.connect('mongodb://localhost:27017/questionDB')
    .then(() => console.log('Connected'));

const app = express();

  app.set('views', path.join(process.cwd(), './views'));
  app.set('view engine', 'ejs');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(process.cwd(), './public')));

  app.use('/', mainRouter);

  app.use(function(req, res, next) {
    next(createError(404));
  });

  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });

  app.get('/random-question', async (req, res) => {
    try {
      const count = await Question.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const randomQuestion = await Question.findOne().skip(randomIndex);
      res.json(randomQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).send('Помилка сервера');
    }
  });

  app.post('/save-response', async (req, res) => {
    try {
      const { response, id } = req.body;
      const answer = new Answer({ questionId: id, response: response });
      await answer.save();
      res.send('Відповідь успішно збережена');
    } catch (error) {
      console.error(error);
      res.status(500).send('Помилка сервера');
    }
  });

  export default app;
