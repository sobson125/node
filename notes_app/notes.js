const fs = require('fs');

const addNote = (title, body) => {
  const notes = loadNotes();

  const flag = notes.every((item) => {
    return item.title !== title;
  });

  if (flag) {
    notes.push({
      title: title,
      body: body,
    });
  } else {
    console.log('taka notatka juz istnieje');
  }
  saveNotes(notes);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToSave = notes.filter((item) => item.title !== title);
  saveNotes(notesToSave);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(notes);
};

const readNotes = (title) => {
  const notes = loadNotes();

  const note = notes.find((item) => {
    return item.title === title;
  });
  if (note) {
    console.log(note);
  } else {
    console.log('nie ma notki z takim id');
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const data = dataBuffer.toString();
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
