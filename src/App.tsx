import React, { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const SHAPES = [{ name: "base", coords: [[80, 300], [160, 300]] },
  { name: "post", coords: [[125, 300], [125, 45]] },
  { name: "bar", coords: [[125, 45], [300, 45]] }];

  const canvasRef: React.MutableRefObject<any> = React.useRef(null);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [guessedChars, setGuessedChars] = useState([] as string[]);

  const handleCharClick: any = (e: any) => {
    let selectedChar = e.currentTarget.textContent;
    if ("foobar".indexOf(selectedChar) === -1) {
      drawNextshape();
    } 
    let guessed: string[] = [...guessedChars, selectedChar];
    setGuessedChars(guessed)
  };

  const drawNextshape: any = () => {
    let index = currentShapeIndex;
    setCurrentShapeIndex(index + 1);

    let {coords: [[sx, sy], [ex, ey]]} = SHAPES[index];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.closePath();
    ctx.stroke();

  };

  return (
    <div className="App">
      <div>
        <canvas ref={canvasRef} id="hangman" height={320} width={540} />
      </div>
      <div>
        {"foobar".split("").map(c => (
          <span> _ </span>
        ))}
      </div>
      <div>
        {"abcdefghijklmnopqrstuvwxyz".split("").map(c => (
          <button key={c} onClick={e => handleCharClick(e)} disabled={guessedChars.includes(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
