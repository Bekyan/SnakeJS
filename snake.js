var width = 10;
var height = 10;
var drawTable = function(width, height){
  var html = '<table>';
  for (var h = 0; h < height; h++){
    html += '<tr id=_' + h + '>'
    for (var w = 0; w < width; w++){
      html += '<td class=_' + w + '><\/td>'
    }
    html += '<\/tr>'
  }
  html += '<\/table>'
  return html;
}

var snake = {
  coordinates: [[5,5], [5,6], [5,7], [5,8]],
  direction: 'ArrowUp'
}

var food;

var generateFoodCoordinates = function(){
  let randomY = Math.floor(Math.random() * height);
  let randomX = Math.floor(Math.random() * width);
  return [randomX, randomY];
}

//var field = [[0,0,0,1,1,0,0,0,0,0][0,0,0,0,1,0,0,0,0,0][]]


var moveSnake = function(direction){
  getTd(snake.coordinates.pop()).classList.remove('snakeClass');
  let newHead;
  if (direction === 'ArrowUp'){
    newHead = [snake.coordinates[0][0],(snake.coordinates[0][1]-1+height)%height];
  } else if (direction === 'ArrowDown'){
    newHead = [snake.coordinates[0][0],(snake.coordinates[0][1]+1+height)%height];
  } else if (direction === 'ArrowLeft'){
    newHead = [(snake.coordinates[0][0]-1+width)%width,snake.coordinates[0][1]];
  } else if (direction === 'ArrowRight'){
    newHead = [(snake.coordinates[0][0]+1+width)%width,snake.coordinates[0][1]];
  }
  //Check if the food is found
  if (newHead[0]===food[0] && newHead[1]===food[1]){
    //console.log('Food was found!');
    getTd(food).classList.remove('foodClass');
    snake.coordinates.splice(0, 0, food);

    food = generateFoodCoordinates();
    drawFood();
  }
  if (newHead){
    snake.coordinates.splice(0, 0, newHead);
  }
  console.log('Snake moved');
  drawSnake();
}

var getTd = function(coordinate){
  return document.getElementById('_' + coordinate[1]).getElementsByClassName('_' + coordinate[0])[0];
}

var drawSnake = function(){
  for (let c of snake.coordinates){
    let td = getTd(c).classList.add('snakeClass');
  }
  console.log(snake.coordinates[0]);
}



var drawFood = function(){
  getTd(food).classList.add('foodClass');
}

window.onload = function(){
  document.getElementById('game').innerHTML = drawTable(width, height);
  drawSnake();
  food = generateFoodCoordinates();
  drawFood();
  document.addEventListener('keydown', (event) => {
    snake.direction = event.key;
    //alert('keydown event\n\n' + 'key: ' + keyName);
  });
  window.setInterval(function() { moveSnake(snake.direction); }, 200);
}
