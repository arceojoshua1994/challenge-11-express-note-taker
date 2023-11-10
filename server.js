const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

app.get('/api/notes', async (req, res) => {
  const notes = await fs.readJson('./db/db.json');
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  const notes = await fs.readJson('./db/db.json');
  notes.push(newNote);
  await fs.writeJson('./db/db.json', notes);
  res.json(newNote);
});
