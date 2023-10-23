document.addEventListener('DOMContentLoaded', () => {
    const noteList = document.getElementById('note-list');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveNote = document.getElementById('save-note');
  
    // Function to load existing notes
    const loadNotes = () => {
      fetch('/api/notes')
        .then((response) => response.json())
        .then((data) => {
          noteList.innerHTML = '';
          data.forEach((note) => {
            const li = document.createElement('li');
            li.textContent = note.title;
            li.dataset.id = note.id;
            noteList.appendChild(li);
          });
        });
    };
  
    // Function to save a new note
    const saveNewNote = () => {
      const title = noteTitle.value.trim();
      const text = noteText.value.trim();
  
      if (title && text) {
        fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, text }),
        })
          .then((response) => response.json())
          .then(() => {
            noteTitle.value = '';
            noteText.value = '';
            loadNotes();
          });
      }
    };
  
    // Event listener for save button
    saveNote.addEventListener('click', saveNewNote);
  
    // Event listener for note list items
    noteList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const id = event.target.dataset.id;
        fetch(`/api/notes/${id}`)
          .then((response) => response.json())
          .then((note) => {
            noteTitle.value = note.title;
            noteText.value = note.text;
          });
      }
    });
  
    // Load existing notes on page load
    loadNotes();
  });
  