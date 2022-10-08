import { Constants } from "src/constants/constants";

interface SerializedPlayer {
    x: number;
    y: number;
    dir: number;
    id: string;
}

export class Player {
    id: string;
    name: string;
    x: number;
    y: number;
    dir: number;
    speed: number;

    constructor(username: string, id: string) {
        this.id = id;
        this.name = username;
        this.x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5); 
        this.y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        this.dir = Math.random() * 2 * Math.PI;
        this.speed = 400;
    }

    setDirection(dir: number) {
        this.dir = dir;
    }

    update(dt: number) {
        this.x += dt * this.speed * Math.sin(this.dir);
        this.y -= dt * this.speed * Math.cos(this.dir);
        // Make sure the player stays in bounds
        this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
    }

    serializeForUpdate(): SerializedPlayer {
        return {
          x: this.x,
          y: this.y,
          dir: this.dir,
          id: this.id
        };
      }
}