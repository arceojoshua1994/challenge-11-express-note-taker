const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Read existing notes from db.json
const getNotes = () => JSON.parse(fs.readFileSync('db.json', 'utf8'));

// Write notes to db.json
const writeNotes = (notes) => fs.writeFileSync('db.json', JSON.stringify(notes));

// HTML Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/notes', (req, res) => res.sendFile(__dirname + '/public/notes.html'));

// API Routes
app.get('/api/notes', (req, res) => res.json(getNotes()));
app.post('/api/notes', (req, res) => {
  const newNote = { id: uuid.v4(), ...req.body };
  const notes = getNotes();
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
