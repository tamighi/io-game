import { Constants } from "../../constants/constants";
import { getAsset } from "../assets/assets";
import { getCurrentState } from "../states/states";

interface Player {
  x: number;
  y: number;
  dir: number;
  id: string;
}

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

function renderBackground(x: number, y: number) {
  if (!context || !canvas) {
    return;
  }
  const backgroundX = Constants.MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = Constants.MAP_SIZE / 2 - y + canvas.height / 2;

  const gradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    Constants.MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    Constants.MAP_SIZE / 2 
  );
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "grey");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

let animationFrameRequestId: number = requestAnimationFrame(renderMenu);

function renderPlayer(me: Player) {
  const image = getAsset("ship.svg");

  if (!context || !image || !canvas) {
    return;
  }

  const canvasX = canvas.width / 2;
  const canvasY = canvas.height / 2;

  context.save();
  context.translate(canvasX, canvasY)
  context.rotate(me.dir);
  context.drawImage(
    image, 
    -Constants.PLAYER_RADIUS, 
    -Constants.PLAYER_RADIUS, 
    Constants.PLAYER_RADIUS * 2, 
    Constants.PLAYER_RADIUS * 2
  );
  context.restore();
}

function render() {
  const {me} = getCurrentState();

  if (me && context && canvas) {
    renderBackground(me.x, me.y);
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, Constants.MAP_SIZE, Constants.MAP_SIZE);
    renderPlayer(me);
  }
  
  animationFrameRequestId = requestAnimationFrame(render);
}

function renderMenu() {
  const t = Date.now() / 7500;
  const x = Constants.MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = Constants.MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
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
    return;
  }

  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}
