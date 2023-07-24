import express from 'express';

const app = express();

app.get('/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;

  const resp = await fetch(`https://jsonplaceholder.typicode.com/${resource}/${id}`);
  const json = await resp.json();

  res.send(json);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
