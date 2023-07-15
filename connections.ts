import express, { Response, Request } from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import login from './routes/login';
import addmember from './routes/addmember';
import deletee from './routes/deletee';
import { postgroup, getgroup } from './routes/group';
import { getmessages, postmessages } from './routes/messages';
import signup from './routes/signup';

const app = express();

const sequelize = new Sequelize('mydb', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()


app.use(express.json());

app.post('/signup', signup);

app.post('/login', login);

app.get('/groups', getgroup);

app.post('/groups', postgroup);

app.get('/messages/:groupId', getmessages);

app.post('/messages', postmessages);

app.post('/groups/:groupId/members', addmember);

app.delete('/messages/:groupId', deletee);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


export default sequelize