import { boardsEqual } from './board';
import type { TBoard, TDirections, TCell } from './types';

export const rotateBoard = (board: TBoard, times: number): TBoard => {
  let result = board.map(row => [...row]);
  for (let i = 0; i < times; i++) {
    result = result[0].map((_, colIdx) =>
      result.map(row => row[colIdx]).reverse()
    );
  }
  return result;
};

export const mergeRow = (row: TCell[]): { merged: TCell[]; score: number } => {
  const filtered = row.filter(x => x !== 0);
  const result: TCell[] = [];
  let score = 0;
  let i = 0;

  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const value = filtered[i] * 2;
      result.push(value);
      score += value;
      i += 2;
    } else {
      result.push(filtered[i]);
      i++;
    }
  }

  while (result.length < row.length) {
    result.push(0);
  }

  return { merged: result, score };
};

export const slideBoard = (
  board: TBoard,
  direction: TDirections
): { board: TBoard; score: number; moved: boolean } => {
  const rotations = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 }[direction];
  const rotated = rotateBoard(board, rotations);

  let totalScore = 0;
  const processed = rotated.map(row => {
    const { merged, score } = mergeRow(row);
    totalScore += score;
    return merged;
  });

  const result = rotateBoard(processed, 4 - rotations);
  const moved = !boardsEqual(board, result);

  return { board: result, score: totalScore, moved };
};