const PLAYER = 'X';
var world = document.getElementById("world");
var context = world.getContext('2d');
var FIRSTPLACE = true;

class Coords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function CreateBaseRow(size) {
  return Array.from('-'.repeat(size));
}

function CreateBaseMap(size) {
  var a = [];
  while (a.push(CreateBaseRow(size)) < size);
  return a;
}

function Place(newCoords, m, o) {
  if (o == PLAYER && !FIRSTPLACE) {
    oldCoords = GetPlayersCoords(m);
    m[oldCoords.x][oldCoords.y] = '-';
  }
  FIRSTPLACE = false;
  m[newCoords.x][newCoords.y] = o;
}

function CheckPlayerOuter(element) {
  return element.indexOf(PLAYER) > -1;
}

function GetPlayersCoords(map) {
  var coords = new Coords(0, 0);
  var counter = 0;
  for (var row in map) {
    if (CheckPlayerOuter(map[counter])) {
      coords.x = counter;
      break;
    }
    counter++;
  }
  try {
    coords.y = map[coords.x].indexOf(PLAYER);
  } catch (error) {}
  return coords;
}

function MaxHeight(map) {
  return map.length-1;
}

function MaxWidth(map) {
  return map[0].length-1;
}

function CanMoveThere(m, dir) {
  var r = false;
  var coords = GetPlayersCoords(m);
  if (coords.y < 0 || coords.x < 0) {
    return r;
  }

  switch (dir) {
    case 0: // top.
      r = coords.x != 0;
      break;

    case 1: // right.
      r = coords.y != MaxWidth(m);
      break;

    case 2: // bottom.
      r = coords.x != MaxHeight(m);
      break;

    case 3: // left.
      r = coords.y != 0;
      break;

    default:
      break;
  }
  return r;
}

function Move(m, dir) {
  var coords = GetPlayersCoords(m);
  if (CanMoveThere(m, dir)) {
    switch (dir) {
      case 0: // Move up.
        coords.x -= 1;
        Place(coords, m, PLAYER);
        break;
      case 1: // Move right.
        coords.y += 1;
        Place(coords, m, PLAYER);
        break;
      case 2: // Move down.
        coords.x += 1;
        Place(coords, m, PLAYER);
        break;
      case 3: // Move left.
        coords.y -= 1;
        Place(coords, m, PLAYER);
        break;
      default:
        console.debug('You tried to move: ' + dir);
        console.debug("How'd you fuck that up..");
        break;
    }
  }
}

function DrawMap(map) {
  var i = 0; 
  c = GetPlayersCoords(m);
  for (row in map) {
    if (row > (c.x - 5) || row < (c.x + 5)){
      var j = 0;
      for (cell in map[i]) {
        if (cell > (c.x - 5) || cell < (c.x + 5)){
        context.fillStyle = FillStyle(map[i][j]);
        context.fillRect(j * 50, i * 50, 50, 50);
        }
        j += 1;
      }
    }
    i += 1;
  }
}

function FillStyle(square){
  if(square == PLAYER){
    return 'rgb(200, 0, 0)';
  };
  return 'rgb(0, 0, 200)';
}

m = CreateBaseMap(10);
var coords = new Coords(4, 4);
Place(coords, m, PLAYER);
c = GetPlayersCoords(m);
console.debug(c);
DrawMap(m);


document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      Move(m, 3);
      break;
    case 38:
      Move(m, 0);
      break;
    case 39:
      Move(m, 1);
      break;
    case 40:
      Move(m, 2);
      break;
    case 80:
      console.debug(m);
      break;
  }
  DrawMap(m);
};
