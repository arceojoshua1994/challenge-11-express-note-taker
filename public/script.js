// script.js

document.addEventListener('DOMContentLoaded', function() {
    const noteList = document.getElementById('note-list');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveNoteBtn = document.getElementById('save-note');
  
    // Function to fetch and display notes
    function getNotes() {
      fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
          noteList.innerHTML = '';
          data.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.title;
            li.dataset.noteId = note.id;
            noteList.appendChild(li);
          });
        });
    }
  
    // Function to save a new note
    function saveNote() {
      const newNote = {
        title: noteTitle.value,
        text: noteText.value
      };
  
      fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
        .then(response => response.json())
        .then(data => {
          getNotes();
          noteTitle.value = '';
          noteText.value = '';
        });
    }
  
    // Event listener for saving a new note
    saveNoteBtn.addEventListener('click', saveNote);
  
    // Event listener for clicking on a note in the list
    noteList.addEventListener('click', function(event) {
      if (event.target.matches('li')) {
        const noteId = event.target.dataset.noteId;
        fetch(`/api/notes/${noteId}`)
          .then(response => response.json())
          .then(data => {
            noteTitle.value = data.title;
            noteText.value = data.text;
          });
      }
    });
  
    // Initial load of notes
    getNotes();
  });
  