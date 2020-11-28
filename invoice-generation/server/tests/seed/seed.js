const {ObjectID} = require('mongodb');
const {Item} = require('../../models/item');

const items = [
	{
		_id: new ObjectID(),
		name: "Oil",
		quantity: 1,
		medical: false,
		price: 420,
		tax:.20
	},
	{
		_id: new ObjectID(),
		name: "Dettol",
		quantity: 1,
		medical: true,
		price: 100,
		tax:.20
	},
	{
		_id: new ObjectID(),
		name: "Oats",
		quantity: 1,
		medical: false,
		price: 175,
		tax:.20
	}
]

const populateItems = (done) => {
  Item.remove({}).then(() => {
  	console.log(items);
    return Item.insertMany(items).then(() => done())
  })
}

module.exports = {
	items,
	populateItems,
}