const STYLE_HIGHLIGHT = 'highlight';
const LEVEL_FOR_FINISH = 5;
const DELAY_CONSTANT = 500;

const resetGame = () => {
  userLevel.resetLevel();
  userPattern.resetPattern();
  userPattern.updateDidPatternRun(false);
  gamePattern.resetPattern();
  updateLevelDisplay();
  displayMessage(MESSAGE_AFTER_RESET);
  displayMessageWithDelay(MESSAGE_FINISH_INSTRUCTION, 1000);
}

const getNextPatternToAdd = () => {
  const existingPattern = gamePattern.getPattern();
  const level = userLevel.getLevel();
  return existingPattern[((level+1)%4)];
}
const addDifficulty = () => {
  const nextPattern = getNextPatternToAdd();
  gamePattern.addPattern(nextPattern);
}

const checkForSuccess = () => {
  const gamePatternArray = gamePattern.getPattern();
  const userPatternArray = userPattern.getPattern();
  for(i=0; i<gamePatternArray.length; i++){
    if(userPatternArray[i] !== gamePatternArray[i]){
      return false;
    }
  }
  return true;
}

const checkForFinish = () => {
  const level = userLevel.getLevel();
  if(level === LEVEL_FOR_FINISH) {
    displayMessage(MESSAGE_SUCCESSFUL_FINISH_1);
    displayMessageWithDelay(MESSAGE_SUCCESSFUL_FINISH_2, 1000);
    setTimeout(()=> {
      resetGame();
    },2000);
    return true;
  }
  return false;
}

const runGameLogic = () => {
  const userPatternArray = userPattern.getPattern();
  const gamePatternArray = gamePattern.getPattern();

  if(userPatternArray.length === gamePatternArray.length){
      if(checkForSuccess()) {
          userLevel.increaseLevel();
          updateLevelDisplay();
          if(!checkForFinish()) {
            displayMessage(MESSAGE_SUCCESS);
            displayMessageWithDelay(MESSAGE_PATTERN_UPDATED, 1000);
            displayMessageWithDelay(MESSAGE_FINISH_INSTRUCTION, 2000);
            displayMessageWithDelay(MESSAGE_END_PLAY, 3000)
            addDifficulty();
            userPattern.updateDidPatternRun(false);
          }
      } else {
        userLevel.decreaseLevel();
        updateLevelDisplay();
        displayMessage(MESSAGE_FAIL);
      }
      userPattern.resetPattern();
  } else {
    const clicksLeft = gamePatternArray.length - userPatternArray.length;
    const message = `${clicksLeft} clicks to complete the round`;
    displayMessage(message);
  }
}

const runPattern = () => {
  const gamePatternArray = gamePattern.getPattern();
  let counter = 0;
  displayMessage(MESSAGE_START_PLAY);
  while(counter < gamePatternArray.length){
    const color = gamePatternArray[counter];
    highlight(color, counter);
    unHighlight(color, counter);
    counter++;
  }
  updateDidPatternRun(true, counter-1);
}

const highlight = (color, i) => {
  const box = getBoxElementByColor(color);
  setTimeout(() => {
    box.classList.add(STYLE_HIGHLIGHT);
  }, DELAY_CONSTANT*i);
}

const unHighlight = (color, i) => {
  const box = getBoxElementByColor(color);
  setTimeout(() => {
    box.classList.remove(STYLE_HIGHLIGHT);
  }, ((DELAY_CONSTANT*i)+500));
}

const updateDidPatternRun = (flag, i) => {
  setTimeout(() => {
    userPattern.updateDidPatternRun(flag);
    displayMessage(MESSAGE_END_PLAY);
  }, ((DELAY_CONSTANT*i)+500));
}

const onUserClick = () => {
  if(userPattern.getDidPatternRun()) {
      userPattern.addPattern(event.target.textContent.trim());
      runGameLogic();
  } else {
    displayMessage(MESSAGE_PATTERN_WARNING);
  }
}

const addEventListners = () => {
  // event listner to play the pattern
  const playBtn = document.getElementById("play");
  const patternFunc = throttle(runPattern, 2500);
  playBtn.onclick = function(event){
    patternFunc();
  }

  const resetBtn = document.getElementById("reset");
  resetBtn.onclick = function(event){
    resetGame();
  }

  //adding event listner to boxes for user clicks
  gamePattern.getPattern().forEach((color) => {
    const box = getBoxElementByColor(color);
    box.onclick = function(event) {
      onUserClick();
    };
  });
}

addEventListners();    


