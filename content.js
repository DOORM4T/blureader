const viewer = document.createElement("div");
const viewerHandle = document.createElement("div");
const resizableArea = document.createElement("textarea");

viewer.id = "blureader-viewer";
viewer.style.opacity = 0;

viewerHandle.id = "blureader-viewer-handle";

resizableArea.id = "blureader-resizable-area";
resizableArea.disabled = true;

viewer.appendChild(viewerHandle);
viewer.appendChild(resizableArea);

let active = false;
let grabbing = false;
let moveByLineHeight = false;

document.addEventListener("keyup", ({ keyCode }) => {
  // Activate with F10
  if (keyCode === 121) {
    active = !active;
    if (active) {
      viewer.style.opacity = 1;
      viewer.style.display = "block";
    } else {
      viewer.style.opacity = 0;
      viewer.style.display = "none";
    }
  }

  // Toggle moving by line height
  if (keyCode === 16) {
    moveByLineHeight = !moveByLineHeight;
  }
});

viewerHandle.addEventListener("mousedown", () => {
  grabbing = true;
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
  let { top, left, height } = window.getComputedStyle(viewer);
  top = +top.replace(/px/, "");
  left = +left.replace(/px/, "");
  height = +height.replace(/px/, "");

  let pixelsToMove = moveByLineHeight ? height : 5;

  // Up Arrow Key, Move viewer up
  if (keyCode === 38) {
    if (viewer.getBoundingClientRect().top < height) {
      window.scrollBy({ top: -pixelsToMove });
      return;
    }
    viewer.style.top = top - pixelsToMove + "px";
  }

  // Down Arrow Key, Move viewer down
  if (keyCode === 40) {
    if (viewer.getBoundingClientRect().bottom > window.innerHeight - height) {
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
