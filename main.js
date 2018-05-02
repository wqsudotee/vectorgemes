class Coords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function CreateBaseRow(size){
    return Array.from('-'.repeat(size))
}

function CreateBaseMap(size){
    var a = []; 
    while(a.push(CreateBaseRow(size)) < size);
    return a;
}

function Place(x,y,m,o){
    m[x][y] = o;
}

function GetPlayersCoords(m){
    var coords = new Coords(0,0);
    coords.x = m.map(
    return coords;
}

function Move(m, dir){
    switch(dir) {
        case 0: // Move up.
            break;
        case 1: // Move right.
            break;
        case 2: // Move down.
            break;
        case 3: // Move left.
            break;
        default:
            console.debug("You tried to move: " + dir)
            console.debug("How'd you fuck that up..")
            break;
    }
}

x = CreateBaseMap(10);
Place(0, 9, x, 'X');
c = GetPlayersCoords(x);
console.debug(GetPlayersCoords(x));
