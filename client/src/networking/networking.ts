import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { throttle } from "throttle-debounce";

const socket = io(`ws://${process.env.REACT_APP_BACKEND}`);
export const WebsocketContext = createContext<Socket>(socket);

const connectedPromise = (): Promise<void> => {
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve();
        });
    })
};

export const connect = async() => {
    await connectedPromise();
}

export const updateDirection = throttle(20, (dir: number) => {
    socket.emit('updateDirection', dir);
});