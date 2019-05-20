function Queue() {

  var items = [];

  this.enqueue = function(element){
    items.push(element);
  };

  this.dequeue = function(){
    return items.shift();
  };

  this.front = function(){
    return items[0];
  };

  this.isEmpty = function(){
    return items.length == 0;
  };

  this.clear = function(){
    items = [];
  };

  this.size = function(){
    return items.length;
  };

  this.print = function(){
    return items.toString();
  };
}

function Stack() {

  var items = [];

  this.push = function(element){
    items.push(element);
  };

  this.pop = function(){
    return items.pop();
  };

  this.peek = function(){
    return items[items.length-1];
  };

  this.isEmpty = function(){
    return items.length == 0;
  };

  this.size = function(){
    return items.length;
  };

  this.clear = function(){
    items = [];
  };

  this.print = function(){
    return items.toString();
  };
}


function BallClock() {
  var queueOfBalls = new Queue();
  var minuteStack = new Stack();
  var fiveMinuteStack = new Stack();
  var hourStack = new Stack();
  var days = [];
  var pastDays = 0;

  var isPM = false;

  this.minute = function () {
    var ballValue = 0;
    if (!this.isQueueEmpty()) {
      ballValue = queueOfBalls.front();
      queueOfBalls.dequeue();
      minuteStack.push(ballValue);
    }
    return ballValue;
  };

  this.fiveMinute = function () {
    var ballValue = 0;
    if (minuteStack.size() >= 5) {
      ballValue = minuteStack.peek();
      minuteStack.pop();
      fiveMinuteStack.push(ballValue);
      for (var i = 1; i < 5; i++) {
        queueOfBalls.enqueue(minuteStack.peek());
        minuteStack.pop();
      }
    }
    return ballValue;
  };

  this.hour = function () {
    var ballValue = 0;
    if (fiveMinuteStack.size() >= 12) {
      ballValue = fiveMinuteStack.peek();
      fiveMinuteStack.pop();
      hourStack.push(ballValue);
      for (var i = 1; i < 12; i++) {
        queueOfBalls.enqueue(fiveMinuteStack.peek());
        fiveMinuteStack.pop();
      }
    }
    return ballValue;
  };

  this.day = function () {
    var ballValue = 0;
    if (hourStack.size() >= 11) {
      ballValue = hourStack.peek();
      hourStack.pop();
      queueOfBalls.enqueue(ballValue);
      for (var i = 1; i < 11; i++) {
        queueOfBalls.enqueue(hourStack.peek());
        hourStack.pop();
      }

      if (isPM) {
        pastDays++;
        isPM = false;
      } else {
        isPM = true;
      }
      days.push(ballValue);

    }
    return ballValue;
  };


  this.begin = function (numBalls) {
    while (days.length < numBalls) {
      this.minute();
      this.fiveMinute();
      this.hour();
      this.day();
    }

    return pastDays;
  };

  this.isQueueEmpty = function(){
    return queueOfBalls.isEmpty();
  };

  this.populate = function (balls) {
    if (balls > 0) {
      for (var i = 1; i <= balls; i++) {
        queueOfBalls.enqueue(i);
      }
      return true;
    }
    return false;
  };

  this.prompt = function(){
    var balls = 0;
    while((balls < 27 || balls > 127) || isNaN(balls)) {
      balls = parseInt(prompt('Please enter the number of balls:', '27 - 127'), 10);
      if (balls === null) {
        return;
      }
      alert('You must be a number between 27 and 127. You entered ' + balls);
    }
    return balls;
  };

}

let ballClock = new BallClock();

const balls = ballClock.prompt();
const isReady = ballClock.populate(balls);

if (isReady && (balls >= 27 && balls <= 127)) {
  document.getElementById('balls').innerHTML = balls + ' balls takes '+ ballClock.begin(balls) + ' days';

}





