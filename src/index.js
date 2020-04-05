import fitText from "./box-fit.js";
import fronts from "./fronts.js";
import { preloadImage, download, selectAll } from "./helpers.js";

const loading = document.querySelector(".loading");
const app = document.querySelector(".app");
const canvas = app.querySelector("canvas");

const textBox = app.querySelector("textarea");
const selector = app.querySelector("select");
const downloadButton = app.querySelector("button");

const ctx = canvas.getContext("2d");
const preloadedFronts = {};

function reDraw() {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  const chosen = selector.value;

  const front = fronts[chosen];
  const text = textBox.value.trim();

  const image = preloadedFronts[chosen];

  ctx.drawImage(image, 0, 0, width, height);

  if (text.length === 0) return;

  ctx.save();
  ctx.setTransform(...front.transform);
  ctx.globalCompositeOperation = front.composite;

  fitText({
    ctx,
    text: text.toLocaleUpperCase().trim(),
    setup: {
      blur: 3,
      lineHeight: 1.1,
      font: "Kapra",
      // debugRect: true,
      fillStyle: front.fillStyle,
      minSize: front.minSize,
      maxSize: front.maxSize,
      box: {
        width: width / front.wFactor,
        height: height / front.hFactor,
        x: width / front.xFactor,
        y: height / front.yFactor,
      },
    },
  });

  ctx.restore();
}

const font = new FontFace("Kapra", 'url("/fonts/Kapra-Bold.woff2")');

async function main() {
  await font.load();

  //Preload all front images images
  for (const [front, setup] of Object.entries(fronts)) {
    const i = await preloadImage(setup.image);
    preloadedFronts[front] = i;
  }

  loading.hidden = true;
  app.hidden = false;

  //Add event listeners
  downloadButton.addEventListener("click", () => download(canvas));
  textBox.addEventListener("input", reDraw);
  selector.addEventListener("input", reDraw);
  textBox.addEventListener("click", selectAll);

  //Initial redraw
  reDraw();
}

main();
