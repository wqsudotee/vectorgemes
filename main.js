const PLAYER = 'X';

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
  if (o == PLAYER) {
    oldCoords = GetPlayersCoords(m);
    m[oldCoords.x][oldCoords.y] = '-';
  }
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
  coords.y = map[coords.x].indexOf(PLAYER);
  return coords;
}

function MaxHeight(map) {
  map.length;
}

function MaxWidth(map) {
  map[0].length;
}

function CanMoveThere(m, dir) {
  var r = false;
  var coords = GetPlayersCoords(m);

  switch (dir) {
    case 0: // top.
      r = coords.x != 0;
      break;

    case 1: // right.
      r = coords.y != MaxWidth(m);
      break;

    case 2: // bottom.
      r = coords.x != MaxWidth(m);
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
        Place(coords, dir, PLAYER);
        break;
      case 1: // Move right.
        coords.y += 1;
        Place(coords, dir, PLAYER);
        break;
      case 2: // Move down.
        coords.x += 1;
        Place(coords, dir, PLAYER);
        break;
      case 3: // Move left.
        coords.y -= 1;
        Place(coords, dir, PLAYER);
        break;
      default:
        console.debug('You tried to move: ' + dir);
        console.debug("How'd you fuck that up..");
        break;
    }
  }
}

m = CreateBaseMap(10);
var coords = new Coords(4, 9);
Place(coords, m, PLAYER);
c = GetPlayersCoords(m);
console.debug(c);

Move(m, 0);
c = GetPlayersCoords(m);
console.debug(c);
