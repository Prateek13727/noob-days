// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
// let obj = new ObjectID();
// console.log(obj)
MongoClient.connect('mongodb://loc.al/ToDoApp',(err, db) => {
  if(err) {
    console.log('unable to connect to mongoDB')
  }
  console.log('connected to mongoDB server')

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("59bed0f87439aa6724bf4aae")
  },
  {
    $set: {
      text: "new course found"
    }
  },
  {
    returnOriginal: false
  })
  .then((result) => {
    console.log(result)
  });
  //db.close
});
