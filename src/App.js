import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var drawingResult = -1;
  var checkDrawingResult = false;
  var isMobile = false;

  window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = 80;
    canvas.height = 100;
    context.strokeStyle = "red";
    context.lineWidth = 3;

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

    canvas.ontouchstart = startDrawing;
    canvas.ontouchend = stopDrawing;
    canvas.ontouchmove = draw;

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;
    canvas.onmouseleave = stopDrawing2;

    function stopDrawing2() {
      if (isDrawing) {
        stopDrawing();
        isDrawing = false;
      }
    }

    function calculateRedLine() {
      let count = 0;
      let rgba = context.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rgba.data.length; i += 1) {
        if (
          rgba.data[i] === 255 &&
          rgba.data[i + 1] === 0 &&
          rgba.data[i + 2] === 0
        ) {
          count += 1;
        }
      }

      return count;
    }

    function calculateWhiteDots() {
      let count = 0;
      let rgba = context.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rgba.data.length; i += 1) {
        if (
          rgba.data[i] === 255 &&
          rgba.data[i + 1] === 255 &&
          rgba.data[i + 2] === 255
        ) {
          count += 1;
        }
      }

      return count;
    }

    function drawDottedLine(fromX, fromY, toX, toY) {
      context.lineWidth = 2;
      context.strokeStyle = "white";
      context.setLineDash([5, 5]);

      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    }

    function drawInitial() {
      context.beginPath();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      drawDottedLine(55, 5, 55, -48);
      context.restore();

      context.save();
      context.rotate((285 * Math.PI) / 180);
      drawDottedLine(-22, 20, -22, 70);
      context.restore();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      drawDottedLine(28, -8, 28, -50);
      context.restore();
    }

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();

      if (isMobile) {
        context.moveTo(
          e.changedTouches[0].clientX - canvas.offsetLeft,
          e.changedTouches[0].clientY - canvas.offsetTop
        );
      } else {
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      }
    }

    function draw(e) {
      let x = null;
      let y = null;
      if (isDrawing === true) {
        console.log(isDrawing);
        if (isMobile) {
          x = e.changedTouches[0].clientX - canvas.offsetLeft;
          y = e.changedTouches[0].clientY - canvas.offsetTop;
        } else {
          x = e.pageX - canvas.offsetLeft;
          y = e.pageY - canvas.offsetTop;
        }

        context.lineTo(x, y);
        context.stroke();
      }
    }

    function stopDrawing() {
      isDrawing = false;

      let totalRed = calculateRedLine();
      let totalWhite = calculateWhiteDots();

      if (totalRed < 800 && totalRed > 500 && totalWhite < (455 * 40) / 100) {
        checkDrawingResult = true;
      } else {
        checkDrawingResult = false;
      }

      if (drawingResult === 1) {
        checkDrawingResult = true;
      } else if (drawingResult === 0) {
        checkDrawingResult = false;
      }

      document.getElementById("result").innerHTML =
        "Result: " + checkDrawingResult;

      drawingResult = -1;

      // Clear drawed line
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitial();
    }

    drawInitial();
  };

  return (
    <>
      <div className="App">
        <canvas id="canvas" />
        <div id="result" />
      </div>
    </>
  );
}

export default App;
