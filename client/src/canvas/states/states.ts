interface Player {
    x: number,
    y: number,
    direction: number,
    id: string
}

interface Game {
    time: number,
    me: Player,
    others: Player[]
}

const RENDER_DELAY = 100;

const gameUpdates = new Array<Game>;
let gameStart = 0;
let firstServerTimestamp = 0;

export function initState() {
    gameStart = 0;
    firstServerTimestamp = 0;
}

export function processGameUpdate(update: Game) {
    if (!firstServerTimestamp) {
        firstServerTimestamp = update.time;
        gameStart = Date.now();
    }
    gameUpdates.push(update);
    
    // Keep only one game update before the current server time
    const base = getBaseUpdate();
    if (base > 0) {
        gameUpdates.splice(0, base);
    }
}

function currentServerTime() {
    return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}

// Returns the index of the base update, the first game update before
// current server time, or -1 if N/A.
function getBaseUpdate() {
    const serverTime = currentServerTime();
    for (let i = gameUpdates.length - 1; i >= 0; i--) {
      if (gameUpdates[i].time <= serverTime) {
        return i;
      }
    }
    return -1;
}