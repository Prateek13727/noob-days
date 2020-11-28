const DEFAULT_PATTERN = ["red", "yellow", "blue", "green"];

const userLevel = {
  level: 0,
  getLevel: function(){
    return this.level;
  },
  increaseLevel: function(){
    this.level += 1;
  },
  decreaseLevel: function(){
    if(this.level != 0) {
      this.level -= 1;  
    }
  },
  resetLevel: function(){
    this.level = 0;
  }
}

const gamePattern = {
  pattern: DEFAULT_PATTERN,
  getPattern: function(){
    return this.pattern;
  },
  addPattern: function(pattern){
    this.pattern.push(pattern);
  },
  resetPattern: function(){
    this.pattern = DEFAULT_PATTERN;
  }
}

const userPattern = {
  pattern: [],
  didPatternRun: false,
  getPattern: function(){
    return this.pattern;
  },
  addPattern: function(pattern){
    this.pattern.push(pattern);
  },
  resetPattern: function(){
    this.pattern = []
  },
  updateDidPatternRun(flag){
    this.didPatternRun = flag
  },
  getDidPatternRun(){
    return this.didPatternRun;
  }
}

//game init methods
updateLevelDisplay();
displayMessage(MESSAGE_DEFAULT)
displayMessageWithDelay(MESSAGE_FINISH_INSTRUCTION, 2000);


















  
 