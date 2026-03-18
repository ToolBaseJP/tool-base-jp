import React, { useEffect, useMemo, useState } from "react";

const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;
const SIZE = 8;

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

const DIFFICULTIES = {
  easy: "かんたん",
  normal: "ふつう",
  hard: "むずかしい",
};

function createInitialBoard() {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY));
  board[3][3] = WHITE;
  board[3][4] = BLACK;
  board[4][3] = BLACK;
  board[4][4] = WHITE;
  return board;
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function inBounds(r, c) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function getOpponent(player) {
  return player === BLACK ? WHITE : BLACK;
}

function getFlips(board, row, col, player) {
  if (!inBounds(row, col) || board[row][col] !== EMPTY) return [];

  const opponent = getOpponent(player);
  const flips = [];

  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    const line = [];

    while (inBounds(r, c) && board[r][c] === opponent) {
      line.push([r, c]);
      r += dr;
      c += dc;
    }

    if (line.length > 0 && inBounds(r, c) && board[r][c] === player) {
      flips.push(...line);
    }
  }

  return flips;
}

function getValidMoves(board, player) {
  const moves = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const flips = getFlips(board, r, c, player);
      if (flips.length > 0) {
        moves.push({ row: r, col: c, flips });
      }
    }
  }
  return moves;
}

function applyMove(board, row, col, player) {
  const flips = getFlips(board, row, col, player);
  if (flips.length === 0) return null;

  const next = cloneBoard(board);
  next[row][col] = player;
  for (const [r, c] of flips) {
    next[r][c] = player;
  }
  return next;
}

function countStones(board) {
  let black = 0;
  let white = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell === BLACK) black++;
      if (cell === WHITE) white++;
    }
  }

  return { black, white };
}

function playerName(player) {
  return player === BLACK ? "黒" : "白";
}

function isCorner(row, col) {
  return (
    (row === 0 && col === 0) ||
    (row === 0 && col === SIZE - 1) ||
    (row === SIZE - 1 && col === 0) ||
    (row === SIZE - 1 && col === SIZE - 1)
  );
}

function isXSquare(row, col) {
  return (
    (row === 1 && col === 1) ||
    (row === 1 && col === SIZE - 2) ||
    (row === SIZE - 2 && col === 1) ||
    (row === SIZE - 2 && col === SIZE - 2)
  );
}

function isCSquare(row, col) {
  return (
    (row === 0 && col === 1) ||
    (row === 1 && col === 0) ||
    (row === 0 && col === SIZE - 2) ||
    (row === 1 && col === SIZE - 1) ||
    (row === SIZE - 2 && col === 0) ||
    (row === SIZE - 1 && col === 1) ||
    (row === SIZE - 2 && col === SIZE - 1) ||
    (row === SIZE - 1 && col === SIZE - 2)
  );
}

function isEdge(row, col) {
  return row === 0 || row === SIZE - 1 || col === 0 || col === SIZE - 1;
}

function getPositionalScore(row, col) {
  if (isCorner(row, col)) return 100;
  if (isXSquare(row, col)) return -35;
  if (isCSquare(row, col)) return -20;
  if (isEdge(row, col)) return 12;
  return 2;
}

function evaluateBoard(board, player) {
  const opponent = getOpponent(player);
  const counts = countStones(board);
  const myStones = player === BLACK ? counts.black : counts.white;
  const opponentStones = player === BLACK ? counts.white : counts.black;

  let positional = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === player) positional += getPositionalScore(r, c);
      if (board[r][c] === opponent) positional -= getPositionalScore(r, c);
    }
  }

  const myMoves = getValidMoves(board, player).length;
  const opponentMoves = getValidMoves(board, opponent).length;
  const mobilityScore = (myMoves - opponentMoves) * 8;
  const stoneScore = myStones - opponentStones;

  return positional + mobilityScore + stoneScore;
}

function minimax(board, playerToMove, depth, maximizingPlayer, alpha, beta) {
  const currentMoves = getValidMoves(board, playerToMove);
  const opponent = getOpponent(playerToMove);
  const opponentMoves = getValidMoves(board, opponent);
  const gameOver = currentMoves.length === 0 && opponentMoves.length === 0;

  if (depth === 0 || gameOver) {
    return { score: evaluateBoard(board, maximizingPlayer) };
  }

  if (currentMoves.length === 0) {
    return minimax(board, opponent, depth - 1, maximizingPlayer, alpha, beta);
  }

  const maximizingTurn = playerToMove === maximizingPlayer;
  let bestMove = currentMoves[0];

  if (maximizingTurn) {
    let maxEval = -Infinity;
    for (const move of currentMoves) {
      const nextBoard = applyMove(board, move.row, move.col, playerToMove);
      const result = minimax(nextBoard, opponent, depth - 1, maximizingPlayer, alpha, beta);
      if (result.score > maxEval) {
        maxEval = result.score;
        bestMove = move;
      }
      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) break;
    }
    return { score: maxEval, move: bestMove };
  }

  let minEval = Infinity;
  for (const move of currentMoves) {
    const nextBoard = applyMove(board, move.row, move.col, playerToMove);
    const result = minimax(nextBoard, opponent, depth - 1, maximizingPlayer, alpha, beta);
    if (result.score < minEval) {
      minEval = result.score;
      bestMove = move;
    }
    beta = Math.min(beta, result.score);
    if (beta <= alpha) break;
  }
  return { score: minEval, move: bestMove };
}

function chooseCpuMove(board, player, difficulty) {
  const moves = getValidMoves(board, player);
  if (moves.length === 0) return null;

  if (difficulty === "easy") {
    const cornerMove = moves.find((move) => isCorner(move.row, move.col));
    if (cornerMove) return cornerMove;
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }

  if (difficulty === "normal") {
    let bestMove = moves[0];
    let bestScore = -Infinity;
    for (const move of moves) {
      let score = getPositionalScore(move.row, move.col) + move.flips.length;
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  const result = minimax(board, player, 4, player, -Infinity, Infinity);
  return result.move || moves[0];
}

function Stone({ value }) {
  if (value === EMPTY) return null;

  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        backgroundColor: value === BLACK ? "#111" : "#fff",
        border: value === WHITE ? "1px solid #cfcfcf" : "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    />
  );
}

export default function OthelloGame() {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);
  const [message, setMessage] = useState("黒の番です");
  const [history, setHistory] = useState([]);
  const [passedLastTurn, setPassedLastTurn] = useState(false);
  const [cpuEnabled, setCpuEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState("normal");
  const [cpuThinking, setCpuThinking] = useState(false);
  const [humanColor, setHumanColor] = useState(BLACK);

  const validMoves = useMemo(() => getValidMoves(board, currentPlayer), [board, currentPlayer]);
  const validMoveSet = useMemo(
    () => new Set(validMoves.map((m) => `${m.row}-${m.col}`)),
    [validMoves]
  );
  const scores = useMemo(() => countStones(board), [board]);

  const gameFinished = useMemo(() => {
    const currentMoves = getValidMoves(board, currentPlayer);
    const otherMoves = getValidMoves(board, getOpponent(currentPlayer));
    const total = scores.black + scores.white;
    return total === SIZE * SIZE || (currentMoves.length === 0 && otherMoves.length === 0);
  }, [board, currentPlayer, scores.black, scores.white]);

  function resetGame(nextHumanColor = humanColor) {
    setBoard(createInitialBoard());
    setCurrentPlayer(BLACK);
    setMessage(nextHumanColor === BLACK ? "黒の番です" : "黒（CPU）の番です");
    setHistory([]);
    setPassedLastTurn(false);
    setCpuThinking(false);
    setHumanColor(nextHumanColor);
  }

  function undoMove() {
    if (history.length === 0 || cpuThinking) return;

    const stepsBack = cpuEnabled ? Math.min(2, history.length) : 1;
    const previous = history[history.length - stepsBack];
    setBoard(previous.board);
    setCurrentPlayer(previous.currentPlayer);
    setMessage(previous.message);
    setPassedLastTurn(previous.passedLastTurn);
    setCpuThinking(false);
    setHistory((prev) => prev.slice(0, -stepsBack));
  }

  function finishGame(nextBoard) {
    const finalScore = countStones(nextBoard);
    setPassedLastTurn(false);
    if (finalScore.black > finalScore.white) {
      setMessage("ゲーム終了：黒の勝ち！");
    } else if (finalScore.white > finalScore.black) {
      setMessage("ゲーム終了：白の勝ち！");
    } else {
      setMessage("ゲーム終了：引き分け！");
    }
  }

  function playMove(row, col) {
    if (gameFinished) return;

    const nextBoard = applyMove(board, row, col, currentPlayer);
    if (!nextBoard) return;

    setHistory((prev) => [
      ...prev,
      {
        board: cloneBoard(board),
        currentPlayer,
        message,
        passedLastTurn,
      },
    ]);

    const nextPlayer = getOpponent(currentPlayer);
    const nextMoves = getValidMoves(nextBoard, nextPlayer);
    const currentMovesAfter = getValidMoves(nextBoard, currentPlayer);

    setBoard(nextBoard);

    if (nextMoves.length > 0) {
      setCurrentPlayer(nextPlayer);
      setPassedLastTurn(false);
      setMessage(`${playerName(nextPlayer)}の番です`);
    } else if (currentMovesAfter.length > 0) {
      setCurrentPlayer(currentPlayer);
      setPassedLastTurn(true);
      setMessage(`${playerName(nextPlayer)}は置けないためパス。${playerName(currentPlayer)}の番です`);
    } else {
      finishGame(nextBoard);
    }
  }

  function handleCellClick(row, col) {
    const cpuColor = getOpponent(humanColor);
    if (cpuEnabled && currentPlayer === cpuColor) return;
    if (cpuThinking) return;
    playMove(row, col);
  }

  useEffect(() => {
    if (!cpuEnabled) return;
    const cpuColor = getOpponent(humanColor);
    if (currentPlayer !== cpuColor) return;
    if (history.length === 0 && humanColor === BLACK && currentPlayer === WHITE) return;
    if (gameFinished) return;

    const moves = getValidMoves(board, cpuColor);
    if (moves.length === 0) return;

    setCpuThinking(true);
    setMessage(`${playerName(cpuColor)}（CPU）が考え中... [${DIFFICULTIES[difficulty]}]`);

    const timer = setTimeout(() => {
      const cpuMove = chooseCpuMove(board, cpuColor, difficulty);
      setCpuThinking(false);
      if (cpuMove) {
        const nextBoard = applyMove(board, cpuMove.row, cpuMove.col, cpuColor);
        if (!nextBoard) return;

        setHistory((prev) => [
          ...prev,
          {
            board: cloneBoard(board),
            currentPlayer: cpuColor,
            message: `${playerName(cpuColor)}の番です`,
            passedLastTurn,
          },
        ]);

        const humanNextColor = getOpponent(cpuColor);
        const nextMoves = getValidMoves(nextBoard, humanNextColor);
        const cpuMovesAfter = getValidMoves(nextBoard, cpuColor);

        setBoard(nextBoard);

        if (nextMoves.length > 0) {
          setCurrentPlayer(humanNextColor);
          setPassedLastTurn(false);
          setMessage(`${playerName(humanNextColor)}の番です`);
        } else if (cpuMovesAfter.length > 0) {
          setCurrentPlayer(cpuColor);
          setPassedLastTurn(true);
          setMessage(`${playerName(humanNextColor)}は置けないためパス。${playerName(cpuColor)}（CPU）の番です`);
        } else {
          finishGame(nextBoard);
        }
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      setCpuThinking(false);
    };
  }, [board, currentPlayer, cpuEnabled, difficulty, gameFinished, passedLastTurn, humanColor, history.length]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "24px",
        fontFamily: "sans-serif",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <h1 style={{ fontSize: "48px", margin: "0 0 12px 0", textAlign: "center" }}>オセロ</h1>
          <p style={{ textAlign: "center", color: "#4b5563", marginBottom: "16px" }}>
            CPU対戦つき。プレイヤーとCPUの先攻・後攻を選べます。
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <button
              onClick={undoMove}
              disabled={history.length === 0 || cpuThinking}
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                backgroundColor: history.length === 0 || cpuThinking ? "#f3f4f6" : "#fff",
                cursor: history.length === 0 || cpuThinking ? "not-allowed" : "pointer",
              }}
            >
              1手戻る
            </button>
            <button
              onClick={() => resetGame(humanColor)}
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#111827",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              リセット
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "18px", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={cpuEnabled}
                onChange={(e) => {
                  const nextEnabled = e.target.checked;
                  setCpuEnabled(nextEnabled);
                  resetGame(humanColor);
                }}
              />
              CPU対戦
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              プレイヤー
              <select
                value={humanColor}
                onChange={(e) => {
                  const nextHumanColor = Number(e.target.value);
                  setHumanColor(nextHumanColor);
                  resetGame(nextHumanColor);
                }}
                style={{ padding: "6px 10px", borderRadius: "10px" }}
              >
                <option value={BLACK}>先攻（黒）</option>
                <option value={WHITE}>後攻（白）</option>
              </select>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              難易度
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  resetGame(humanColor);
                }}
                style={{ padding: "6px 10px", borderRadius: "10px" }}
              >
                <option value="easy">かんたん</option>
                <option value="normal">ふつう</option>
                <option value="hard">むずかしい</option>
              </select>
            </label>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ fontSize: "32px", marginTop: 0, marginBottom: "16px" }}>ゲーム情報</h2>

            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>黒</span>
                <strong>{scores.black}</strong>
              </div>

              <div
                style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>白</span>
                <strong>{scores.white}</strong>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>現在の状態</div>
              <div style={{ fontWeight: 700 }}>{message}</div>
            </div>

            <div
              style={{
                marginTop: "16px",
                borderRadius: "16px",
                backgroundColor: "#f9fafb",
                padding: "16px",
                fontSize: "14px",
                color: "#4b5563",
                lineHeight: 1.7,
              }}
            >
              <div>・かんたん: 角を少し優先しつつ、ほぼランダムです。</div>
              <div>・ふつう: 角や端、危険マスを見て打ちます。</div>
              <div>・むずかしい: 4手先まで読んで打ちます。</div>
              <div>・プレイヤーを後攻（白）にすると、CPUが先に打ちます。</div>
              <div>・CPU対戦中の「1手戻る」は、プレイヤーの手番まで2手まとめて戻します。</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                width: "fit-content",
                margin: "0 auto",
                backgroundColor: "#065f46",
                padding: "12px",
                borderRadius: "24px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 56px)",
                  gap: "4px",
                }}
              >
                {board.map((row, r) =>
                  row.map((cell, c) => {
                    const isValid = validMoveSet.has(`${r}-${c}`) && !gameFinished;
                    const cpuColor = getOpponent(humanColor);
                    const canPlayerClick = !(cpuEnabled && currentPlayer === cpuColor) && !cpuThinking;
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "#16a34a",
                          border: "none",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          cursor: canPlayerClick ? "pointer" : "default",
                        }}
                      >
                        <Stone value={cell} />
                        {cell === EMPTY && isValid && (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#bbf7d0",
                              position: "absolute",
                            }}
                          />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px", color: "#4b5563" }}>
              手番: <strong style={{ color: "#111827" }}>{playerName(currentPlayer)}</strong>
              {passedLastTurn ? "（直前の手番でパスあり）" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
