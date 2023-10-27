const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../db/db.json');

router.get('/notes', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.send('Note deleted');
    });
  });
});

module.exports = router;
