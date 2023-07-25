import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();

// middlewares
app.use(express.json());

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
  process.exit(1);
}

const Book = sequelize.define("books", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
   title: {
     type: DataTypes.STRING,
     allowNull: false
   },
   author: {
     type: DataTypes.STRING,
     allowNull: false
   }
}, {
  // options

  // `createdAt`, `updatedAt` fields are created and updated automatically
  // https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
  timestamps: false, // don't create fields
});

try {
  // sequelize.sync({ force: true, });
  sequelize.sync();
  console.log('books table created');
} catch (e) {
  console.error('unable to create books table');
  // console.error(e);
  process.exit(1);
}

app.get('/books', async (req, res) => {
  try {
    // https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-query
    // const books = await sequelize.query('SELECT * FROM books', {
    //   type: sequelize.QueryTypes.SELECT,
    // });
    const books = await Book.findAll();
    res.send(books);
  } catch (e) {
    res.status(500).end();
  }
});

// https://expressjs.com/en/guide/routing.html#route-parameters
app.get('/books/:id(\\d+)', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id) ?? {};
    res.send(book);
  } catch (e) {
    res.status(500).end();
  }
});

app.post('/books', async (req, res) => {
  const { title, author } = Object.keys(req.query).length !== 0 ? req.query : req.body;

  try {
    const book = await Book.create({
        title,
        author,
    });

    res.send(book);
  } catch (e) {
    res.status(500).end();
  }
});

app.post('/books/:title/:author', async (req, res) => {
  const { title, author } = req.params;

  try {
    const book = await Book.create({
        title,
        author,
    });

    res.send(book);
  } catch (e) {
    res.status(500).end();
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
