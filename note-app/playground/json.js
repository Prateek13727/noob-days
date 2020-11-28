const fs = require('fs');

let jsonObj = {
  title: "understanding JSON",
  body: "parse and stringify",
  value: 1
}

let jsonStringObj = JSON.stringify(jsonObj);
console.log(typeof jsonStringObj)
console.log(jsonStringObj)
fs.writeFileSync('notes.json', jsonStringObj);

let noteStringObj = fs.readFileSync('notes.json');
let noteObj = JSON.parse(noteStringObj)
console.log(typeof noteObj)
console.log(noteObj)
