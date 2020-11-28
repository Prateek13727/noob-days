var socket = io();
socket.on('connect', function() {
  console.log("socket connected");
})
socket.on('disconnect', function() {
  console.log("socket disconnected");
})
socket.on('newMessage', function(messageDetails){
  const li = jQuery('<li></li>');
  li.text(`${messageDetails.from}: ${messageDetails.text}`)
  jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(messageDetails){
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');
  a.attr('href', messageDetails.url);
  li.text(`${messageDetails.from}: `)
  li.append(a);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	'text': 'Hi',
// 	'from': 'Frank'
// },(data) => {
// 	console.log(`Got it ${data}`)
// })

jQuery('#message-form').on('submit', (event) => {
	event.preventDefault();
	socket.emit('createMessage', {
		'text': jQuery('input[name=message]').val(),
		'from': 'User'
		},(data) => {
			console.log(`Got it ${data}`)
		}
	)
})

const sendLocationBtn = jQuery('#send-location');
sendLocationBtn.on('click', (event) => {
	if(!navigator.geolocation) {
		alert("geolocation feature is not supported")
		return;
	}
	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('currentLocation', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, (err) => {
		alert(err);
	})

})







