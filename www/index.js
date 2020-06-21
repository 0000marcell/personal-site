import { Text } from "wasm-game-of-life";

function draw() {
  let canvas = document.getElementById('canvas')
  canvas.width = 500
  canvas.height = 500
  let ctx = canvas.getContext('2d');
  ctx.font = '48px serif';
  const text = Text.new()
  console.log("text value: ", text.value());
  ctx.fillStyle = "#fff";
  ctx.fillText(text.value(), text.x(), text.y());
}

draw()
