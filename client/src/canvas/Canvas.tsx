import React from "react"
import { downloadAssets } from "./assets/assets";
import { stopPlaying, setCanvasDimensions, startPlaying } from "./render/render";
import '../css/main.css';

export const Canvas = () => {

    /* Initialize Canvas */

    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const context = React.useRef<CanvasRenderingContext2D | null>(null);

    const getCanvasContext = () => {
        context.current = canvasRef?.current?.getContext("2d") || null;
    };
    
    /* On canvas mount */

    React.useEffect(() => {
        setCanvasDimensions();
    }, []);

    React.useEffect(() => {
        stopPlaying(canvasRef?.current, context?.current);
    }, []);

    React.useEffect(getCanvasContext, []);

    /* Menu hidden till we load images */
    const [hiddenMenu, setHiddenMenu] = React.useState<boolean>(true);

    React.useEffect(() => {
        const download = async () => {
            await downloadAssets();
            setHiddenMenu(false);
        }
        download();
    }, []);

    /* On window resize */

    React.useEffect(() => {
        window.addEventListener('resize', setCanvasDimensions);
        return () => window.removeEventListener('resize', setCanvasDimensions);
    }, []);

    /* Play */

    const onPlayClick = () => {
        setHiddenMenu(true);
        startPlaying();
    }

    return (
        <>
        <canvas id="game-canvas" ref={canvasRef}>

        </canvas>
        <div className={hiddenMenu? 'hidden' : ''} id="play-menu">
            <input type="text" id="username-input" placeholder="Username" />
            <button id="play-button" onClick={onPlayClick}>PLAY</button>
        </div>
        </>
    )
}