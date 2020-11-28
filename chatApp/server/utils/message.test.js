const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {
	it('should generate correct message object', () => {
		const from = "admin";
		const text = "Hello"
		const message = generateMessage(from, text);
		// expect(message.createdAt).toBeInstanceOf();
		expect(message.from).toEqual(from);
		expect(message.text).toEqual(text);
		// expect(message).toinclude({ from, text });
	});

	it('should generate correct location message', () => {
		const from = "admin";
		const latitude = 30;
		const longitude = 20;
		const url = `https://www.google.com/maps/?q=${latitude},${longitude}`
		const message = generateLocationMessage(from, {latitude, longitude});
		expect(message.from).toEqual(from);
		expect(message.url).toEqual(url);
	});
});