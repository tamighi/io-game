import { Player } from "./class/Player";
import { Socket } from 'socket.io';

interface SerializedPlayer {
    x: number;
    y: number;
    dir: number;
    id: string;
}

interface SentUpdate {
    time: number;
    me : SerializedPlayer;
};

export class GameService {

    players: Map<string, Player>;
    sockets: Map<string, Socket>;
    lastUpdateTime: number;
    shouldSendUpdate: boolean;

    constructor() {
        this.players = new Map();
        this.sockets = new Map();
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        this.loopUpdate();
    }

    async addToGame(client: Socket, name: string) {
        const player = new Player(name, client.id);
        this.players.set(client.id, player);
        this.sockets.set(client.id, client);
    }

    async updateDirection(id: string, dir: number) {
        this.players.get(id)?.setDirection(dir);
    }

    async update() {
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;
    }

    loopUpdate() {
        const myInterval = setInterval(() => {
            const now = Date.now();
            const dt = (now - this.lastUpdateTime) / 1000;
            this.lastUpdateTime = now;

            this.players.forEach(player => player.update(dt));

            if (this.shouldSendUpdate === true) {
                this.shouldSendUpdate = false;

                this.sockets.forEach((socket, key) => {
                    const player = this.players.get(key);
                    if (!player) {
                        return ;
                    }
                    socket.emit('update', this.createUpdate(player));
                })
            }
            else {
                this.shouldSendUpdate = true;
            }
        }, 1000 / 60 );
    }

    createUpdate(player: Player): SentUpdate {
        return {
            time: Date.now(),
            me: player.serializeForUpdate()
        }
    }
}