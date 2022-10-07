import React from "react"
import { downloadAssets } from "../assets/assets";
import '../css/main.css';

export const Canvas = () => {
    /* Initialize Canvas */
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const context = React.useRef<CanvasRenderingContext2D | null>(null);

    const  setCanvasDimensions = () => {
        const canvas = canvasRef?.current;
        if (!canvas) {
            return ;
        }

        const scaleRatio = Math.max(1, 800 / window.innerWidth);
        canvas.width = scaleRatio * window.innerWidth;
        canvas.height = scaleRatio * window.innerHeight;
    }

    const getCanvasContext = () => {
        context.current = canvasRef?.current?.getContext("2d") || null;
    };

    const setCanvasBackground = () => {
        if (!context?.current || !canvasRef?.current) {
            return ;
        }

        const canvas = canvasRef.current;
        const gradient = context.current.createRadialGradient(
            canvas.width / 2, canvas.height / 2, canvas.width/10, 
            canvas.width / 2, canvas.height / 2, canvas.width/2
        );
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "grey");

        context.current.fillStyle = gradient;
        context.current.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    //  On mount
    React.useEffect(setCanvasDimensions, []);
    
    React.useEffect(setCanvasBackground, []);
    React.useEffect(getCanvasContext, []);

    const [hidden, setHidden] = React.useState<boolean>(true);
    React.useEffect(() => {
        const download = async () => {
            await downloadAssets();
            setHidden(false);
        }
        download();
    }, []);

    //  On resize
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('resize', setCanvasBackground);

    return (
        <>
        <canvas id="game-canvas" ref={canvasRef}>

        </canvas>
        <div className={hidden? 'hidden' : ''} id="test">
            Test
        </div>
        </>
    )
}