import express from 'express';
import { Sequelize } from 'sequelize';

const app = express();

// const sequelize = new Sequelize('postgres://postgres:pass1234@localhost:5433/world');
//
// constructor(database: string, username: string, password: string, options: object)
const sequelize = new Sequelize('world', 'postgres', 'pass1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database.');
  // console.error(error);
}

app.get('/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;

  const resp = await fetch(`https://jsonplaceholder.typicode.com/${resource}/${id}`);
  const json = await resp.json();

  res.send(json);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
