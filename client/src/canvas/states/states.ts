import { Player, SentUpdate } from "../interfaces/interfaces";

const RENDER_DELAY = 100;

const gameUpdates = new Array<SentUpdate>();
let gameStart = 0;
let firstServerTimestamp = 0;

export function initState() {
  gameStart = 0;
  firstServerTimestamp = 0;
}

export function processGameUpdate(update: SentUpdate) {
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

// Returns { me, others, bullets }
export function getCurrentState() {
  if (!firstServerTimestamp) {
    return {};
  }

  const base = getBaseUpdate();
  const serverTime = currentServerTime();

  // If base is the most recent update we have, use its state.
  // Otherwise, interpolate between its state and the state of (base + 1).
  if (base < 0 || base === gameUpdates.length - 1) {
    return gameUpdates[gameUpdates.length - 1];
  } else {
    const baseUpdate = gameUpdates[base];
    const next = gameUpdates[base + 1];
    const ratio =
      (serverTime - baseUpdate.time) / (next.time - baseUpdate.time);
    return {
      me: interpolateObject(baseUpdate.me, next.me, ratio),
    };
  }
}

function interpolateObject(object1: Player, object2: Player, ratio: number) {
  if (!object2) {
    return object1;
  }

  const interpolated: Player = {
    dir: interpolateDirection(object1.dir, object2.dir, ratio),
    x: object1.x + (object2.x - object1.x) * ratio,
    y: object1.y + (object2.y - object1.y) * ratio,
    id: object1.id,
  };

  return interpolated;
}

// function interpolateObjectArray(
//   objects1: Player[],
//   objects2: Player[],
//   ratio: number
// ) {
//   return objects1.map((o) =>
//     interpolateObject(o, objects2.find((o2) => o.id === o2.id) as Player, ratio)
//   );
// }

// Determines the best way to rotate (cw or ccw) when interpolating a direction.
// For example, when rotating from -3 radians to +3 radians, we should really rotate from
// -3 radians to +3 - 2pi radians.
function interpolateDirection(d1: number, d2: number, ratio: number) {
  const absD = Math.abs(d2 - d1);
  if (absD >= Math.PI) {
    // The angle between the directions is large - we should rotate the other way
    if (d1 > d2) {
      return d1 + (d2 + 2 * Math.PI - d1) * ratio;
    } else {
      return d1 - (d2 - 2 * Math.PI - d1) * ratio;
    }
  } else {
    // Normal interp
    return d1 + (d2 - d1) * ratio;
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
