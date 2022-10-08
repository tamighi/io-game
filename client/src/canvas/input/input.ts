import { updateDirection } from "../../networking/networking";

function onMouseInput(e: MouseEvent) {
    handleInput(e.clientX, e.clientY);
}
  
function handleInput(x: number, y: number) {
    const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
    updateDirection(dir);
}

export function startCapturingInput() {
    window.addEventListener("mousemove", onMouseInput);
}

export function stopCapturingInput() {
    window.removeEventListener("mousemove", onMouseInput);
}