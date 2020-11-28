export function getRandomNumber(min, max) {
    return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
}

export function getRelativeFilepath(src=""){
  return src.split("/").slice(1).join("/").substring(1);
}

export function throttle(func, limit) {
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