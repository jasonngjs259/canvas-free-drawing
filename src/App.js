import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var drawingResult = -1;
  var checkDrawingResult = false;
  var startPointX = 0;
  var startPointY = 0;

  window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = 1000;
    canvas.height = 900;
    context.strokeStyle = "blue";
    context.lineWidth = 10;

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;

    function drawDottedLine(fromX, fromY, toX, toY) {
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.setLineDash([5, 15]);

      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    }

    function drawInitial() {
      context.fillStyle = "rgba(255, 0, 0, 1)"; // red
      context.fillRect(0, 0, 800, 900);
      context.fillStyle = "rgba(0, 255, 0, 1)"; // lime

      context.beginPath();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      context.fillRect(200, -600, 100, 500);
      drawDottedLine(250, -600, 250, -130);
      context.restore();

      context.save();
      context.rotate((285 * Math.PI) / 180);
      context.fillRect(-210, 200, 100, 525);
      drawDottedLine(-160, 250, -160, 725);
      context.restore();

      // context.save();
      // context.rotate((285 * Math.PI) / 180);
      // context.fillRect(-210, 200, 100, 525);
      // drawDottedLine(-160, 250, -160, 725);
      // context.restore();
    }

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();
      context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      startPointX = e.pageX - canvas.offsetLeft;
      startPointY = e.pageY - canvas.offsetTop;
    }

    function draw(e) {
      if (isDrawing === true) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;

        let rgba = context.getImageData(x, y, 1, 1).data;

        if (rgba[0] === 255 && rgba[1] === 0 && rgba[2] === 0) {
          if (drawingResult === -1 || drawingResult === 1) {
            drawingResult = 0;
          }
        } else if (rgba[0] === 0 && rgba[1] === 255 && rgba[2] === 0) {
          if (drawingResult === -1 || drawingResult !== 0) {
            drawingResult = 1;
          }
        }

        context.lineTo(x, y);
        context.stroke();
        context.restore();
      }
    }

    function stopDrawing() {
      isDrawing = false;

      if (drawingResult === 1) {
        checkDrawingResult = true;
      } else if (drawingResult === 0) {
        checkDrawingResult = false;
      }

      console.log(checkDrawingResult);
      drawingResult = -1;

      // Clear drawed line
      drawInitial();
    }

    drawInitial();
  };

  return (
    <div className="App">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
