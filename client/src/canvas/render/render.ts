import { MAP_SIZE } from "../../constants/constants";
import { getAsset } from "../assets/assets";

const Constants = require('../../constants/constants');

const { PLAYER_RADIUS } = Constants;

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

function renderBackground(){
    if (!context || !canvas) {
        return ;
    }
    const gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, MAP_SIZE / 10, 
        canvas.width / 2, canvas.height / 2, MAP_SIZE / 2
    );
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "grey");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

let animationFrameRequestId: number = requestAnimationFrame(renderBackground);


function renderPlayer() {
    const image = getAsset('cat/Idle (1).png');
    if (!context || !image || !canvas) {
        return ;
    }
    const canvasX = canvas.width / 2;
    const canvasY = canvas.height / 2;

    context.save();
    context.drawImage(
        image, canvasX, canvasY, PLAYER_RADIUS, PLAYER_RADIUS
      );
    context.restore();
}

function render() {
    renderBackground();
    renderPlayer();
    animationFrameRequestId = requestAnimationFrame(render);
}

function renderMenu() {
    renderBackground();
    animationFrameRequestId = requestAnimationFrame(renderMenu);
}

export function setCanvasRefs(
    newCanvas: HTMLCanvasElement | null,
    newContext: CanvasRenderingContext2D | null
) {
    canvas = newCanvas;
    context = newContext;
}

export function stopRendering() {
    cancelAnimationFrame(animationFrameRequestId);
    animationFrameRequestId = requestAnimationFrame(renderMenu);
}

export function startRendering() {
    cancelAnimationFrame(animationFrameRequestId);
    animationFrameRequestId = requestAnimationFrame(render);
}

export function setCanvasDimensions() {
    if (!canvas) {
        return ;
    }

    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}