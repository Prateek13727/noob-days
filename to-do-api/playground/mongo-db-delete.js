// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
// let obj = new ObjectID();
// console.log(obj)
MongoClient.connect('mongodb://loc.al/ToDoApp',(err, db) => {
  if(err) {
    console.log('unable to connect to mongoDB')
  }
  console.log('connected to mongoDB server')

  db.collection('Todos').deleteOne({
    _id: new ObjectID("59bed09f4bb8ed65f48791b8")
  }).then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
      console.log(err)
  });

  //deleteMany

  //findOneAndDelete
});
