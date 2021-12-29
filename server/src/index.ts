import express from 'express';
import { createConnection, Connection } from 'typeorm';
import { users } from './entity/user';

const app = express();

createConnection()
  .then(async (connection) => {
    //entities: [users];
    //connection.manager.create(users);
    // const user = new users();
    // user.userName = 'kimcoding';
    // user.email = 'kimcoding@naver.com';
    // user.password = '1234';
    // user.profileImage = 'http://image.com';
    //await connection.manager.save(user);
  })
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen('8000', () => {
  console.log('hello');
});
