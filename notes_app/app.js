const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  },
});


yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function(argv) {
    notes.removeNote(argv.title);
  },
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
});


yargs.command({
  command: 'list',
  describe: 'Listing all notes',
  handler: function() {
    notes.listNotes();
  },
});

yargs.command({
  command: 'read',
  describe: 'Reading a note',
  handler: function(argv) {
    notes.readNotes(argv.title);
  },
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
});
yargs.parse();

