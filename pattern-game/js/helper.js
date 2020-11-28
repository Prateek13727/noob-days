const displayMessage = (message) => {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = message;
}

const displayMessageWithDelay = (message, delay) => {
	setTimeout(() => {
		displayMessage(message);
	}, delay)
}

const updateLevelDisplay = () => {
  const userLevelElement = document.getElementById("level");
  userLevelElement.value = userLevel.getLevel();
}

const togglePlayButton = () => {
  const playButtonElement = document.getElementById("btn");
  playButtonElement.disabled = !playButtonElement.disabled;
}

const getBoxElementByColor = (color) => {
  const className = `bg-${color}`;
  return getElementsbyClassName(className);
}

const getElementById = (id) => {
	return document.getElementById(id);
}

const getElementsbyClassName = (className) => {
  return document.getElementsByClassName(className)[0];
}

const throttle = function(func, limit) {
  let throttleIn;
  return function() {
    const context = this;
    if(!throttleIn) {
      func.apply(context, arguments);
      throttleIn = true;
      setTimeout(() => {
        throttleIn = false;
      }, limit)
    }
  }
}