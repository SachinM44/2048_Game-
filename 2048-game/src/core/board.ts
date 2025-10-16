import { DEFAULT_BOARD_SIZE } from '../utils/constants';
import type { TBoard, IPosition, ITilesData } from './types';

export const createEmptyBoard = (size: number = DEFAULT_BOARD_SIZE): TBoard =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

export const getEmptyCells = (board: TBoard): IPosition[] => {
  const empty: IPosition[] = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) empty.push({ row: r, col: c });
    });
  });
  return empty;
};

export const addRandomTile = (board: TBoard): TBoard => {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;

  const { row, col } = empty[Math.floor(Math.random() * empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = value;
  return newBoard;
};

export const boardsEqual = (a: TBoard, b: TBoard): boolean =>
  a.every((row, r) => row.every((cell, c) => cell === b[r][c]));

export const canMove = (board: TBoard): boolean => {
  if (getEmptyCells(board).length > 0) return true;

  const size = board.length; 
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const current = board[r][c];
      if (c < size - 1 && current === board[r][c + 1]) return true;
      if (r < size - 1 && current === board[r + 1][c]) return true;
    }
  }
  return false;
};

export const hasWon = (board: TBoard): boolean =>
  board.some(row => row.some(cell => cell === 2048));

let tileIdCounter = 0;
export const boardToTiles = (board: TBoard): ITilesData[] => {
  const tiles: ITilesData[] = [];
  board.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value !== 0) {
        tiles.push({
          id: `${r}-${c}-${value}-${Date.now()}-${tileIdCounter++}`,
          value,
          position: { row: r, col: c },
        });
      }
    });
  });
  return tiles;
};

