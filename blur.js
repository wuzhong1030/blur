var canvasWidth = window.innerWidth,
  canvasHeiht = window.innerHeight,
  radius = 50,
  canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  clipObj = { x: -1, y: -1, r: radius },
  img = new Image(),
  resetBtn = document.getElementsByClassName("reset")[0],
  showBtn = document.getElementsByClassName("show")[0],
  container = document.getElementsByClassName("container")[0],
  image = document.getElementsByTagName("img")[0],
  leftMargin = 0,
  topMargin = 0,
  theLeft = 0,
  theTop = 0,
  imgArr = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg"];

canvas.width = canvasWidth;
canvas.height = canvasHeiht;
canvas.addEventListener("touchstart", function(e) {
  e.preventDefault();
});

//随机取出一张图片
image.src = img.src = imgArr[parseInt(Math.random() * imgArr.length)];
img.onload = function() {
  container.style.width = canvasWidth + "px";
  container.style.height = canvasHeiht + "px";
  image.style.width = img.width + "px";
  image.style.height = img.height + "px";

  leftMargin = (img.width - canvas.width) / 2;
  topMargin = (img.height - canvas.height) / 2;

  image.style.top = String(-topMargin) + "px";
  image.style.left = String(-leftMargin) + "px";
  initCanvas();
};
function setClippingRegion(clippingRegion) {
  context.beginPath();
  context.arc(
    clippingRegion.x,
    clippingRegion.y,
    clippingRegion.r,
    0,
    Math.PI * 2,
    false
  );
  context.clip();
}

function initCanvas() {
  theLeft = leftMargin < 0 ? -leftMargin : 0;
  theTop = topMargin < 0 ? -topMargin : 0;
  clipObj = {
    x: Math.random() * (canvas.width - 2 * radius - 2 * theLeft) + 50 + theLeft,
    y: Math.random() * (canvas.height - 2 * radius - 2 * theTop) + 50 + theTop,
    r: 0
  };
  var animate_clip = setInterval(function() {
    clipObj.r += 10;
    draw(img, clipObj);
    if (clipObj.r > radius) {
      clearInterval(animate_clip);
    }
  }, 30);
}
function draw(image, clippingObj) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  setClippingRegion(clippingObj);
  context.drawImage(
    image,
    Math.max(leftMargin, 0),
    Math.max(topMargin, 0),
    Math.min(canvas.width, image.width),
    Math.min(canvas.height, image.height),
    theLeft,
    theTop,
    Math.min(canvas.width, image.width),
    Math.min(canvas.height, image.height)
  );
  context.restore();
}
resetBtn.addEventListener("click", function() {
  initCanvas();
});
showBtn.addEventListener("click", function() {
  var animate_show = setInterval(function() {
    clipObj.r += 50;
    draw(img, clipObj);
    if (
      clipObj.r >
      Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))
    ) {
      clearInterval(animate_show);
    }
  }, 30);
});
