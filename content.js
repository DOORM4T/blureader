const viewer = document.createElement("div");
const viewerHandle = document.createElement("div");
const resizableArea = document.createElement("textarea");

viewer.id = "blureader-viewer";
viewerHandle.id = "blureader-viewer-handle";
resizableArea.id = "blureader-resizable-area";
resizableArea.disabled = true;

viewer.appendChild(viewerHandle);
viewer.appendChild(resizableArea);

let active = false;
viewer.style.display = "none";

let grabbing = false;

document.addEventListener("keyup", ({ keyCode }) => {
  if (keyCode === 121) active = !active;
  if (active) viewer.style.display = "block";
  else viewer.style.display = "none";
});

viewerHandle.addEventListener("mousedown", () => {
  grabbing = true;
  console.log(grabbing);
});
viewerHandle.addEventListener("mouseup", () => {
  grabbing = false;
});

document.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (grabbing) {
    gotoMouse(clientX, clientY);
  }
});

document.addEventListener("keydown", ({ keyCode }) => {
  let { top, left } = window.getComputedStyle(viewer);
  top = +top.replace(/px/, "");
  left = +left.replace(/px/, "");

  let pixelsToMove = 5;

  // Up Arrow Key, Move viewer up
  if (keyCode === 38) {
    if (viewer.getBoundingClientRect().top < 10) {
      window.scrollBy({ top: -pixelsToMove });
      return;
    }
    viewer.style.top = top - pixelsToMove + "px";
  }

  // Down Arrow Key, Move viewer down
  if (keyCode === 40) {
    if (viewer.getBoundingClientRect().bottom > window.innerHeight - 10) {
      window.scrollBy({ top: pixelsToMove });
      return;
    }
    viewer.style.top = top + pixelsToMove + "px";
  }

  // Left Arrow Key, Move viewer left
  if (keyCode === 37) viewer.style.left = left - pixelsToMove + "px";

  // Right Arrow Key, Move viewer right
  if (keyCode === 39) viewer.style.left = left + pixelsToMove + "px";
});

document.onkeydown = ({ keyCode }) => {
  if (keyCode === 38 || keyCode === 40) return false;
};

document.body.appendChild(viewer);

function gotoMouse(x, y) {
  const { width, height } = viewerHandle.getBoundingClientRect();
  viewer.style.left = x - width / 2 + "px";
  viewer.style.top = y - height / 2 + "px";
}
