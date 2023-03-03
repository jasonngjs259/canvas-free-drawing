import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var drawingResult = -1;
  var checkDrawingResult = false;
  // var canvasStep = -1;

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

    function drawInitial() {
      context.fillStyle = "rgba(255, 0, 0, 0)";
      context.fillRect(0, 0, 800, 900);
      context.fillStyle = "rgba(0, 255, 0, 1)";
      context.save();
      context.rotate((75 * Math.PI) / 180);
      context.fillRect(200, -600, 100, 500);
      context.restore();
      context.save();
      context.rotate((285 * Math.PI) / 180);
      context.fillRect(-210, 200, 100, 525);
      context.restore();
    }

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();
      context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
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
