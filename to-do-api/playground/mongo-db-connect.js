// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
// let obj = new ObjectID();
// console.log(obj)
MongoClient.connect('mongodb://loc.al/ToDoAppTest',(err, db) => {
  if(err) {
    console.log('unable to connect to mongoDB')
  }
  console.log('connected to mongoDB server')

  db.collection('Todos').insertOne({
    text: 'find new course',
    completed: false
  },(err, result) => {
    if (err) {
      console.log('Could not write to database', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  db.close();

});
