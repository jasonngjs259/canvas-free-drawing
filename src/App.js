import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var initialPoint = { x: 0, y: 0 };
  var collisions = 5;
  var tempCollision = 0;
  var area = 0;
  var tempArea = 0;
  var checkDrawingResult = false;
  var isMobile = false;

  window.onload = function () {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = 686;
    canvas.height = 726;
    context.strokeStyle = "red";
    context.lineWidth = 4;

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;
    canvas.onmouseleave = stopDrawing2;

    canvas.ontouchstart = startDrawing;
    canvas.ontouchend = stopDrawing;
    canvas.ontouchmove = draw;

    const coordPoints = [
      { x: canvas.width, y: 0 },
      { x: (canvas.width * 9) / 10, y: (canvas.height * 1) / 10 },
      { x: (canvas.width * 8) / 10, y: (canvas.height * 2) / 10 },
      { x: (canvas.width * 7) / 10, y: (canvas.height * 3) / 10 },
      { x: (canvas.width * 6) / 10, y: (canvas.height * 4) / 10 },
      { x: (canvas.width * 5) / 10, y: (canvas.height * 5) / 10 },
      { x: (canvas.width * 4) / 10, y: (canvas.height * 6) / 10 },
      { x: (canvas.width * 3) / 10, y: (canvas.height * 7) / 10 },
      { x: (canvas.width * 2) / 10, y: (canvas.height * 8) / 10 },
      { x: (canvas.width * 1) / 10, y: (canvas.height * 9) / 10 },
      { x: 0, y: canvas.height },
    ];

    function stopDrawing2() {
      if (isDrawing) {
        stopDrawing();
        isDrawing = false;
      }
    }

    function drawInitial() {
      for (let n = 0; n < coordPoints.length; n += 1) {
        context.fillStyle = "white";
        context.fillRect(coordPoints[n].x, coordPoints[n].y, 10, 10);
      }
    }

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();

      let x = isMobile
        ? e.changedTouches[0].clientX - canvas.offsetLeft
        : e.pageX - canvas.offsetLeft;
      let y = isMobile
        ? e.changedTouches[0].clientY - canvas.offsetTop
        : e.pageY - canvas.offsetTop;
      context.moveTo(x, y);
      initialPoint = {
        x: x,
        y: y,
      };

      for (let a = 0; a < coordPoints.length; a += 1) {
        if (
          initialPoint.x < coordPoints[a].x &&
          initialPoint.y < coordPoints[a].y
        ) {
          area = 1;
        } else if (
          initialPoint.x > coordPoints[a].x &&
          initialPoint.y > coordPoints[a].y
        ) {
          area = 2;
        }
      }

      tempArea = area;

      console.log(initialPoint);
    }

    function draw(e) {
      let x = isMobile
        ? e.changedTouches[0].clientX - canvas.offsetLeft
        : e.pageX - canvas.offsetLeft;
      let y = isMobile
        ? e.changedTouches[0].clientY - canvas.offsetTop
        : e.pageY - canvas.offsetTop;

      for (let a = 0; a < coordPoints.length; a += 1) {
        if (x < coordPoints[a].x && y < coordPoints[a].y) {
          area = 1;
        } else if (x > coordPoints[a].x && y > coordPoints[a].y) {
          area = 2;
        }
      }

      if (isDrawing === true) {
        if (tempArea !== area) {
          tempArea = area;
          tempCollision += 1;
        }

        context.lineTo(x, y);
        context.stroke();
      }
    }

    function stopDrawing() {
      isDrawing = false;
      console.log(tempCollision);
      if (tempCollision >= collisions) {
        checkDrawingResult = true;
      } else {
        checkDrawingResult = false;
      }

      tempCollision = 0;
      tempArea = 0;
      area = 0;
      initialPoint = { x: 0, y: 0 };
      document.getElementById("result").innerHTML =
        "Result: " + checkDrawingResult;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitial();
    }

    drawInitial();

    let count = 0;
    let rgba = context.getImageData(0, 0, canvas.width, canvas.height);

    // console.log(rgba.data);

    for (let i = 0; i < rgba.data.length; i += 1) {
      if (rgba.data) {
        count += 1;
      }
    }

    // console.log(count);
  };

  return (
    <>
      <div className="App">
        <canvas id="canvas" />
        <div id="demoWound" />
        <div id="result" />
      </div>
    </>
  );
}

export default App;
