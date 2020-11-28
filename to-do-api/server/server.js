require("./config/config")

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const{authenticate} = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({'text': req.body.text})
  todo.save()
    .then((doc) => {
      res.send(doc)
    })
    .catch( (err) => {
      res.status(400).send(err)
    })
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({todos})
    })
    .catch( (err) => {
      res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).send()
      }
      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).send()
      }
      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  let body = _.pick(req.body, ['completed', 'text']);
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed = false;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).status();
      }
      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send(err)
    })
});

app.post('/user', (req, res) => {
  const body = _.pick(req.body, ['password', 'email']);
  const user = new User(body);
  user.save()
    .then(() => {
      return user.generateAuthToken()
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
}); 

app.get('/user/me', authenticate,  (req, res) => {
  const { user, token } = req;
  return res.send(user);
})

app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`);
});

module.exports = {
  app
}

// "test": "export NODE_ENV=test || SET NODE_ENV=\"test\" && mocha server/**/*test.js",