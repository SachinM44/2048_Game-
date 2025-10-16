export type TCell = number;
export type TBoard = TCell[][];
export type TDirections = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface IPosition {
  row: number;
  col: number;
}

export interface ITilesData {
  id: string;
  value: number;
  position: IPosition;
  isNew?: boolean;
  mergedFrom?: IPosition[];
}

export interface IGameState {
  board: TBoard;
  tiles: ITilesData[];
  score: number;
  moves: number;
  bestScore: number;
  isGameOver: boolean;
  isWon: boolean;
  canUndo: boolean;
  boardSize: number;
  previousState: {
    board: TBoard;
    tiles: ITilesData[];
    score: number;
    moves: number;
  } | null;
}

export type TGameAction =
  | { type: 'MOVE'; direction: TDirections }
  | { type: 'RESTART' }
  | { type: 'UNDO' }
  | { type: 'CONTINUE' }
   | { type: 'SET_SIZE'; size: number };
