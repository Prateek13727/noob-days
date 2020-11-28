const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate:{
       validator: (value)=>{
         return validator.isEmail(value);  
       },
       message:'{VALUE} is not a valid Email'
  	}
  },
  password: {
  	type: String,
  	required: true
  },
  tokens: [{
  	access: {
  		type: String,
  		required: true
  	},
  	token: {
  		type: String,
  		required: true
  	}
  }]
})

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	const access = "auth";
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	user.tokens = user.tokens.concat([{access, token}]);
	return user.save().then(() => {
		return token;
	})
}

UserSchema.methods.toJSON = function() {
	const user = this;
	const userObj = user.toObject();
	return _.pick(userObj, ['_id', 'email'])
}

UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;
	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		return Promise.reject();	
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth',
	});
}

UserSchema.pre('save', function(next){
	const user = this;
	const { password } = user;
	if(!(user.isModified('password'))) {
		next();
	} else {
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
		        if(hash) {
	        		user.password = hash;	
	        		next();
		        }
		    });
	    })
	}
})

const User = mongoose.model('User', UserSchema);


module.exports = { User }
