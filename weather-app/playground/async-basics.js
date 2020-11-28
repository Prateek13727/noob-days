console.log("starting up");
setTimeout(() => {
  console.log("async and non-blocking node demo")
},0)
setTimeout(() => {
  console.log("first time out")
},2000)
console.log("closing app")
