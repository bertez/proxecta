export default function ({ ctx, text, setup }) {
  const {
    font,
    box,
    debugRect,
    minSize,
    maxSize,
    lineHeight,
    fillStyle,
    blur,
  } = setup;

  const words = text.trim().split(" ");

  if (debugRect) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";
    ctx.strokeRect(box.x, box.y, box.width, box.height);
  }

  let validLines = [];

  for (let fontSize = minSize; fontSize <= maxSize; fontSize++) {
    const currentLineHeight = fontSize * lineHeight;
    let { x, y, width, height } = box;
    let fy = y + fontSize;

    ctx.font = `${fontSize}px ${font}`;

    validLines = [];
    let line = "";

    for (var word of words) {
      let biggerLine = line + word + " ";

      if (ctx.measureText(biggerLine).width > width) {
        validLines.push({ text: line, x: x + width / 2, y: fy });

        line = word + " ";
        fy += currentLineHeight;
      } else {
        line = biggerLine;
      }
    }
    validLines.push({ text: line, x: x + width / 2, y: fy });

    if (fy > y + height - fontSize) break;
  }

  for (var line of validLines) {
    const { x, y, text } = line;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = "center";
    ctx.shadowColor = fillStyle;
    ctx.shadowBlur = blur || 0;

    ctx.fillText(text.trim(), x, y);
  }
}
