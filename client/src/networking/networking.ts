import { createContext } from "react";
import { io, Socket } from "socket.io-client";

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
    //  Register callbacks
}