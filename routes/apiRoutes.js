const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, '../db/db.json');

function getNotes() {
  const notes = fs.readFileSync(notesFilePath);
  return JSON.parse(notes);
}

function saveNotes(notes) {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes));
}

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const notes = getNotes();
    const newNote = req.body;
    newNote.id = Date.now().toString(); // Unique id based on timestamp
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
  });
};
