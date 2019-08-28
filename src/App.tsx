import React, { useState, MouseEvent } from "react";
import "./App.css";
import { words } from './words';

enum ShapeType {
  Line = "line",
  Arc = "arc"
}

type Coord = [number, number];

interface Shape {
  name: string;
  shape: ShapeType;
  coords: [Coord, Coord];
}

const App: React.FC = () => {
  const SHAPES: Shape[] = [
    { name: "base", shape: ShapeType.Line, coords: [[80, 300], [160, 300]] },
    { name: "post", shape: ShapeType.Line, coords: [[120, 300], [120, 45]] },
    {
      name: "horizontal-bar",
      shape: ShapeType.Line,
      coords: [[120, 45], [300, 45]]
    },
    {
      name: "vertical-bar",
      shape: ShapeType.Line,
      coords: [[300, 45], [300, 80]]
    },
    { name: "head-right", shape: ShapeType.Arc, coords: [[90, 270], [0, 0]] },
    { name: "head-left", shape: ShapeType.Arc, coords: [[90, -270], [0, 0]] },
    { name: "body", shape: ShapeType.Line, coords: [[300, 120], [300, 200]] },
    {
      name: "left-arm",
      shape: ShapeType.Line,
      coords: [[300, 140], [250, 120]]
    },
    {
      name: "right-arm",
      shape: ShapeType.Line,
      coords: [[300, 140], [350, 120]]
    },
    {
      name: "left-leg",
      shape: ShapeType.Line,
      coords: [[300, 200], [350, 230]]
    },
    {
      name: "right-leg",
      shape: ShapeType.Line,
      coords: [[300, 200], [250, 230]]
    }
  ];

  const [word] = useState(words[Math.floor(Math.random() * words.length)]);
  const canvasRef: React.MutableRefObject<any> = React.useRef(null);

  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [guessedChars, setGuessedChars] = useState([] as string[]);
  const [charsLeftToGuess, setCharsLeftToGuess] = useState(word.split(
    ""
  ) as string[]);
  const [gameState, setGameState] = useState({ done: false, won: false });

  const handleCharClick = (e: MouseEvent<HTMLButtonElement>): void => {
    let selectedChar: string = e.currentTarget.textContent || '';
    if (word.indexOf(selectedChar) === -1) {
      drawNextshape();
    }
    let guessed: string[] = [...guessedChars, selectedChar];
    let charsLeft = charsLeftToGuess.filter(c => c !== selectedChar);
    setCharsLeftToGuess(charsLeft);
    setGuessedChars(guessed);
    setGameState({
      done: charsLeft.length === 0 || currentShapeIndex === SHAPES.length - 1,
      won: charsLeft.length === 0
    });
  };

  const drawNextshape = (): void => {
    let index = currentShapeIndex;
    setCurrentShapeIndex(index + 1);

    let {
      coords: [[sx, sy], [ex, ey]],
      shape
    } = SHAPES[index];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if (shape === ShapeType.Arc) {
      ctx.arc(300, 100, 20, (sx * Math.PI) / 180, (sy * Math.PI) / 180, true);
    } else {
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.closePath();
    }
    ctx.stroke();
  };

  return (
    <div className="App">
      <div>
        <canvas ref={canvasRef} id="hangman" height={320} width={540} />
      </div>
      <div>
        {word.split("").map(c => (
          <span key={c} >{guessedChars.includes(c) ? ` ${c} ` : " _ "}</span>
        ))}
      </div>
      <div>
        {"abcdefghijklmnopqrstuvwxyz".split("").map(c => (
          <button
            key={c}
            onClick={e => handleCharClick(e)}
            disabled={guessedChars.includes(c) || gameState.done}
          >
            {c}
          </button>
        ))}
      </div>
      <div>
        {gameState.done && gameState.won
          ? "You Win!"
          : gameState.done
          ? "You Lose!"
          : null}
      </div>
    </div>
  );
};

export default App;
