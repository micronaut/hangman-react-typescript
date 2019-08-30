import React, { useState, MouseEvent } from "react";
import "./App.css";
import { words } from "./words";
import { ShapeType } from "./ShapeType";
import { SHAPES } from "./contants";

const App: React.FC = () => {
  const canvasRef: React.MutableRefObject<any> = React.useRef(null);
  const getNextWord = (): string =>
    words.splice(Math.floor(Math.random() * words.length), 1).pop() || "";

  const [word, setWord] = useState(() => getNextWord());
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [guessedChars, setGuessedChars] = useState(new Array<string>());
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
      coords: {
        start: { x: startX, y: startY },
        end: { x: endX, y: endY }
      },
      shape
    } = SHAPES[index];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if (shape === ShapeType.Arc) {
      ctx.arc(
        300,
        100,
        20,
        (startX * Math.PI) / 180,
        (startY * Math.PI) / 180,
        true
      );
    } else {
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.closePath();
    }
    ctx.stroke();
  };

  return (
    <div className="App">
      <div>
        <button className="new-game" onClick={handleNewGameClick}>
          New Game
        </button>
      </div>
      <div>
        <canvas ref={canvasRef} id="hangman" height={320} width={540} />
      </div>
      <div className="word-display">
        {word.split("").map((c, idx) =>
          gameState.done ? (
            <span className="word-char" key={`c-${idx}`}>
              {c === " " ? " - " : c}
            </span>
          ) : (
            <span className="word-char" key={`c-${idx}`}>
              {guessedChars.includes(c) ? `${c}` : c === " " ? " - " : "_"}
            </span>
          )
        )}
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
