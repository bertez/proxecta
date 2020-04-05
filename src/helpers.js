export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject("Error loading image");
    i.src = src;
  });
}

export function download(c) {
  const data = c.toDataURL("image/jpeg", 1.0);
  const a = document.createElement("a");
  a.href = data;
  a.download = "proxeccion.jpg";
  document.body.appendChild(a);
  a.click();
}

export function selectAll(e) {
  if (e.target.dataset.dirty) return;
  e.target.select();
  e.target.dataset.dirty = true;
}
