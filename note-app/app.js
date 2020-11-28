const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
console.log(process)
const titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
}
const bodyOptions =  {
  describe: 'note body/details',
  demand: true,
  alias: 'b'
}
const argv = yargs
              .command('add', 'Add a new note', {
                title: titleOptions,
                body: bodyOptions
              })
              .command('list', 'get all notes')
              .command('read', 'read note', {
                title: titleOptions
              })
              .command('remove', 'remove note', {
                title: titleOptions
              })
              .help()
              .argv;
let command = argv._[0]
if (command == "add") {
  let note = notes.addNote(argv.title, argv.body);
  if (_.isUndefined(note)) {
    console.log("Note could not be added")
  } else {
    notes.logNote(note)
  }
} else if (command == "list") {
  let allNotes = notes.getAll();
  console.log(`printing ${allNotes.length} notes`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command == "read") {
  let note = notes.getNote(argv.title);
  if(_.isUndefined(note)) {
    console.log("notes not found")
  } else {
    this.logNote(note)
  }
} else if (command == "remove") {
  let result = notes.removeNote(argv.title);
  let message = result ? "notes not found" : "notes removed"
  console.log(message);
} else {
  console.log("command not recognised");
}

let logNote = (note) => {
  console.log("---");
  console.log(`title: ${note.title}`)
  console.log(`body: ${note.body}`)
};
