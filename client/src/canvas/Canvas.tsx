import React from "react"
import { downloadAssets } from "./assets/assets";
import { stopRendering, setCanvasDimensions, startRendering, setCanvasRefs } from "./render/render";
import '../css/main.css';
import { connect, WebsocketContext } from "../networking/networking";
import { startCapturingInput, stopCapturingInput } from "./input/input";

export const Canvas = () => {

    /* Initialize Canvas */

    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const context = React.useRef<CanvasRenderingContext2D | null>(null);

    const getCanvasContext = () => {
        context.current = canvasRef?.current?.getContext("2d") || null;
    };
    
    /* On canvas mount */
    
    React.useEffect(() => {
        setCanvasRefs(canvasRef?.current, context?.current)
    }, []);

    React.useEffect(setCanvasDimensions, []);

    React.useEffect(stopRendering, []);

    React.useEffect(getCanvasContext, []);

    // Menu hidden till we load images
    const [hiddenMenu, setHiddenMenu] = React.useState<boolean>(true);

    React.useEffect(() => {
        Promise.all([downloadAssets(), connect()]).then(() => setHiddenMenu(false));
    }, []);

    /* On window resize */

    React.useEffect(() => {
        window.addEventListener('resize', setCanvasDimensions);
        return () => window.removeEventListener('resize', setCanvasDimensions);
    }, []);

    /* Play */

    const socket = React.useContext(WebsocketContext);
    
    React.useEffect(() => {
        socket.on("onGameOver", () => {
            setHiddenMenu(false);
            stopRendering();
            stopCapturingInput();
        });
        return () => {
            socket.off("onGameOver");
        };
    }, [socket]);

    const onPlayClick = () => {
        socket.emit('play');
        setHiddenMenu(true);
        startRendering();
        startCapturingInput();
    }

    return (
        <>

        <canvas id="game-canvas" ref={canvasRef}/>

        <div className={hiddenMenu? 'hidden' : ''} id="play-menu">
            <input type="text" id="username-input" placeholder="Username" />
            <button id="play-button" onClick={onPlayClick}>PLAY</button>
        </div>

        </>
    )
}