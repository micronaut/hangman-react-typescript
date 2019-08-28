import React, { useState, MouseEvent } from "react";
import "./App.css";
import { words } from "./words";

enum ShapeType {
  Line = "line",
  Arc = "arc"
}

type Coordinate = { x: number; y: number };

interface Shape {
  name: string;
  shape: ShapeType;
  coords: [Coordinate, Coordinate];
}

const App: React.FC = () => {
  const SHAPES: Shape[] = [
    {
      name: "base",
      shape: ShapeType.Line,
      coords: [{ x: 80, y: 300 }, { x: 160, y: 300 }]
    },
    {
      name: "post",
      shape: ShapeType.Line,
      coords: [{ x: 120, y: 300 }, { x: 120, y: 45 }]
    },
    {
      name: "horizontal-bar",
      shape: ShapeType.Line,
      coords: [{ x: 120, y: 45 }, { x: 300, y: 45 }]
    },
    {
      name: "vertical-bar",
      shape: ShapeType.Line,
      coords: [{ x: 300, y: 45 }, { x: 300, y: 80 }]
    },
    {
      name: "head-right",
      shape: ShapeType.Arc,
      coords: [{ x: 90, y: 270 }, { x: 0, y: 0 }]
    },
    {
      name: "head-left",
      shape: ShapeType.Arc,
      coords: [{ x: 90, y: -270 }, { x: 0, y: 0 }]
    },
    {
      name: "body",
      shape: ShapeType.Line,
      coords: [{ x: 300, y: 120 }, { x: 300, y: 20 }]
    },
    {
      name: "left-arm",
      shape: ShapeType.Line,
      coords: [{ x: 300, y: 140 }, { x: 250, y: 120 }]
    },
    {
      name: "right-arm",
      shape: ShapeType.Line,
      coords: [{ x: 300, y: 140 }, { x: 350, y: 120 }]
    },
    {
      name: "left-leg",
      shape: ShapeType.Line,
      coords: [{ x: 300, y: 200 }, { x: 350, y: 230 }]
    },
    {
      name: "right-leg",
      shape: ShapeType.Line,
      coords: [{ x: 300, y: 200 }, { x: 250, y: 230 }]
    }
  ];

  const getNextWord = (): string =>
    words.splice(Math.floor(Math.random() * words.length), 1).pop() || "";

  const [word, setWord] = useState(() => getNextWord());

  const canvasRef: React.MutableRefObject<any> = React.useRef(null);

  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [guessedChars, setGuessedChars] = useState([] as string[]);
  const [charsLeftToGuess, setCharsLeftToGuess] = useState(
    word.split("").filter(c => c !== " ")
  );
  const [gameState, setGameState] = useState({ done: false, won: false });

  const handleCharClick = (e: MouseEvent<HTMLButtonElement>): void => {
    let selectedChar: string = e.currentTarget.textContent || "";
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

  const handleNewGameClick = (): void => {
    const newWord = getNextWord();
    setWord(newWord);
    setCurrentShapeIndex(0);
    setGuessedChars([]);
    setGameState({
      done: false,
      won: false
    });
    setCharsLeftToGuess(newWord.split("").filter(c => c !== " "));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawNextshape = (): void => {
    let index = currentShapeIndex;
    setCurrentShapeIndex(index + 1);

    let {
      coords: [{ x: sx, y: sy }, { x: ex, y: ey }],
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
        <button onClick={handleNewGameClick}>New Game</button>
      </div>
      <div>
        <canvas ref={canvasRef} id="hangman" height={320} width={540} />
      </div>
      <div className="word-display">
        {word.split("").map((c, idx) => (
          <span className="word-char" key={`c-${idx}`}>
            {guessedChars.includes(c) ? `${c}` : c === " " ? " - " : "_"}
          </span>
        ))}
      </div>
      <div>
        {"abcdefghijklmnopqrstuvwxyz".split("").map(c => (
          <button
            className="char-button"
            key={c}
            onClick={e => handleCharClick(e)}
            disabled={guessedChars.includes(c) || gameState.done}
          >
            {c}
          </button>
        ))}
      </div>
      <div className={`result ${gameState.won ? "winner" : "loser"}`}>
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
