import type { IGameState, TGameAction } from './types';
import { createEmptyBoard, addRandomTile, canMove, hasWon, boardToTiles } from './board';
import { slideBoard } from './algorithms';
import { loadBestScore, saveBestScore } from '../utils/storage';
import { DEFAULT_BOARD_SIZE } from '../utils/constants';

const initialBoard = (size: number = DEFAULT_BOARD_SIZE) => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

export const createInitialState = (size: number = DEFAULT_BOARD_SIZE): IGameState => {
  const board = initialBoard(size);
  return {
    board,
    tiles: boardToTiles(board),
    score: 0,
    bestScore: loadBestScore(),
    moves: 0,
    isGameOver: false,
    isWon: false,
    canUndo: false,
    boardSize: size, 
    previousState: null,
  };
};

export const initialState: IGameState = createInitialState();

export const gameReducer = (state: IGameState, action: TGameAction): IGameState => {
  switch (action.type) {
    case 'MOVE': {
      if (state.isGameOver || state.isWon) return state;

      const { board: newBoard, score: moveScore, moved } = slideBoard(
        state.board,
        action.direction
      );

      if (!moved) return state;

      const boardWithNew = addRandomTile(newBoard);
      const newScore = state.score + moveScore;
      const newBestScore = Math.max(state.bestScore, newScore);
      const won = hasWon(boardWithNew);
      const gameOver = !canMove(boardWithNew);

      if (newBestScore > state.bestScore) {
        saveBestScore(newBestScore);
      }

      return {
        ...state,
        board: boardWithNew,
        tiles: boardToTiles(boardWithNew),
        score: newScore,
        bestScore: newBestScore,
        moves: state.moves + 1,
        isGameOver: gameOver,
        isWon: won && !state.isWon,
        canUndo: true,
        previousState: {
          board: state.board,
          tiles: state.tiles,
          score: state.score,
          moves: state.moves,
        },
      };
    }

    case 'UNDO': {
      if (!state.previousState) return state;

      return {
        ...state,
        board: state.previousState.board,
        tiles: state.previousState.tiles,
        score: state.previousState.score,
        moves: state.previousState.moves,
        isGameOver: false,
        canUndo: false,
        previousState: null,
      };
    }

    case 'CONTINUE': {
      return {
        ...state,
        isWon: false,
      };
    }

    case 'RESTART': {
      const board = initialBoard(state.boardSize);
      return {
        board,
        tiles: boardToTiles(board),
        score: 0,
        bestScore: state.bestScore,
        moves: 0,
        isGameOver: false,
        isWon: false,
        canUndo: false,
        boardSize: state.boardSize,
        previousState: null,
      };
    }

    case 'SET_SIZE': {
      const newState = createInitialState(action.size);
      return {
        ...newState,
        bestScore: state.bestScore,
      };
    }

    default:
      return state;
  }
};
