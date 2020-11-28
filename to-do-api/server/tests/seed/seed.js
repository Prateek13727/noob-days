const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const todos = [{
  text: "create a new test from postman",
  _id: new ObjectID()
},{
  text: "create a new test2 from postman",
  _id: new ObjectID()
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
	{
		_id: userOneId,
		email: 'prateekpandeytest@gmail.com',
		password: 'userOnePass',
		tokens: [{
			access: 'auth',
			token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
		}]
	},
	{
		_id: userTwoId,
		email: 'pranavpandeytest@gmail.com',
		password: 'userTwoPass',
	}
]


const populateUsers = (done) => {
	User.remove({})
	.then(() => {
    	const userOne = new User(users[0]).save();
    	const userTwo = new User(users[1]).save();

    	return Promise.all([userOne, userTwo])
  	})
  	.then(() => done());
}

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(() => done())
  })
}


module.exports = {
	todos,
	populateUsers,
	populateTodos,
}