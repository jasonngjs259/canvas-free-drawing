import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var drawingResult = -1;
  var checkDrawingResult = false;
  var startPointX = 0;
  var startPointY = 0;
  var endPointX = 0;
  var endPointY = 0;

  window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = 80;
    canvas.height = 100;
    context.strokeStyle = "blue";
    context.lineWidth = 1;

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;
    if (isDrawing === true) canvas.onmouseleave = stopDrawing;

    function drawDottedLine(fromX, fromY, toX, toY) {
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.setLineDash([1, 1]);

      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    }

    function drawInitial() {
      context.fillStyle = "rgba(255, 0, 0, 0.1)"; // red
      context.fillRect(0, 0, 80, 100);
      context.fillStyle = "rgba(0, 255, 0, 0.1)"; // lime

      context.beginPath();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      context.fillRect(48, -50, 15, 55);
      drawDottedLine(55, 5, 55, -48);
      context.restore();

      context.save();
      context.rotate((285 * Math.PI) / 180);
      context.fillRect(-30, 20, 15, 55);
      drawDottedLine(-22, 20, -22, 70);
      context.restore();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      context.fillRect(20, -50, 15, 50);
      drawDottedLine(28, -8, 28, -50);
      context.restore();

      //---------------------------------------------------

      // context.save();
      // context.rotate((285 * Math.PI) / 180);
      // context.fillRect(-470, 265, 100, 525);
      // // drawDottedLine(-415, 315, -415, 770);
      // context.restore();

      // context.save();
      // context.rotate((75 * Math.PI) / 180);
      // context.fillRect(710, -475, 100, 525);
      // // drawDottedLine(755, -455, 755, 50);
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
        // console.log(e.target.getBoundingClientRect().top);
        // console.log(e.pageX, e.pageY);
        console.log(canvas.offsetLeft, canvas.offsetTop);
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        // let x = e.pageX - canvas.offsetLeft;
        // let y = e.pageY - canvas.offsetTop;

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

        // console.log(drawingResult);

        context.lineTo(x, y);
        context.stroke();
      }
    }

    function stopDrawing(e) {
      isDrawing = false;
      endPointX = e.pageX - canvas.offsetLeft;
      endPointY = e.pageY - canvas.offsetTop;

      if (drawingResult === 1) {
        checkDrawingResult = true;
      } else if (drawingResult === 0) {
        checkDrawingResult = false;
      }

      console.log(checkDrawingResult);
      document.getElementById("result").innerHTML =
        "Result: " +
        checkDrawingResult +
        "<br />Start Point: (" +
        startPointX +
        ", " +
        startPointY +
        ")<br />End Point: (" +
        endPointX +
        ", " +
        endPointY +
        ")";

      drawingResult = -1;

      // Clear drawed line
      drawInitial();
    }

    drawInitial();
  };

  return (
    <>
      <div className="App">
        <canvas id="canvas" />
        {/* <div className="canvasContainer">
          <canvas id="canvas" />
        </div> */}
        <div id="result" />
      </div>
    </>
  );
}

export default App;
