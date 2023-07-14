import express, {request,response,NextFunction }from 'express';
import jwt from 'jsonwebtoken';
import pgPromise from 'pg-promise';

const app = express();
const pgp = pgPromise();
const db = pgp('postgres://postgres:localhost:5432/aman_testing');

app.use(express.json());

const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const result = await db.one(insertUserQuery, [username, password]);
  const userId = result.id;
  const token = jwt.sign({ userId }, 'secret');
  res.send({ token });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});