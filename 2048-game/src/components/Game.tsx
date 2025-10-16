import React, { useReducer, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gameReducer, initialState } from '../core/gameReducer';
import { useKeyboard } from '../hooks/useKeyboard';
import { Tile } from './Tile';
import { GameOverlay } from './GameOverlay';
import type { TDirections } from '../core/types';

const AVAILABLE_SIZES = [3, 4, 5, 6];

export const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleMove = useCallback((direction: TDirections) => {
    dispatch({ type: 'MOVE', direction });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const handleContinue = useCallback(() => {
    dispatch({ type: 'CONTINUE' });
  }, []);

  const handleSizeChange = useCallback((size: number) => {
    dispatch({ type: 'SET_SIZE', size });
  }, []);

  useKeyboard(handleMove);

  return (
    <div className="min-h-screen bg-[#faf8ef] flex items-center justify-center p-4">
      <div className="w-full max-w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl pl-18 font-bold text-[#a89e95]">2048</h1>
          <div className="flex gap-3 ml-3">
            <div className="bg-[#bbada0] px-6 py-3 rounded-2xl">
              <div className="text-[#eee4da] text-xs font-bold ml- uppercase">Score</div>
              <div className="text-white text-2xl font-bold">{state.score}</div>
            </div>
            <div className="bg-[#bbada0] px-6 py-3 rounded-2xl">
              <div className="text-[#eee4da] text-xs font-bold uppercase">Best</div>
              <div className="text-white text-2xl font-bold">{state.bestScore}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4 justify-center">
          {AVAILABLE_SIZES.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-5 py-2 rounded font-bold transition-colors ${
                state.boardSize === size
                  ? 'bg-[#776e65] text-white'
                  : 'bg-[#bbada0] text-white hover:bg-[#8f7a66]'
              }`}
            >
              {size}x{size}
            </button>
          ))}
        </div>

        <div className="bg-[#8f7a66] text-white px-4 py-2 rounded text-center mb-4">
          <p className="text-sm">
            Use Arrow Keys or WASD to move tiles. Combine same numbers to reach 2048!
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleRestart}
            className="flex-1 bg-[#8f7a66] text-white px-4 py-2 rounded font-bold hover:bg-[#9f8a76] transition-colors"
          >
            New Game
          </button>
          <button
            onClick={handleUndo}
            disabled={!state.canUndo}
            className="flex-1 bg-[#8f7a66] text-white px-4 py-2 rounded font-bold hover:bg-[#9f8a76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Undo
          </button>
        </div>

        <div className="relative bg-[#bbada0] p-2 rounded shadow-lg">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${state.boardSize}, 1fr)`,
            }}
          >
            {Array(state.boardSize * state.boardSize)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="aspect-square bg-[#cdc1b4] rounded" />
              ))}
          </div>

          <div className="absolute inset-2">
            <AnimatePresence>
              {state.tiles.map(tile => (
                <Tile key={tile.id} tile={tile} boardSize={state.boardSize} />
              ))}
            </AnimatePresence>
          </div>

          <GameOverlay
            isWon={state.isWon}
            isGameOver={state.isGameOver}
            onRestart={handleRestart}
            onContinue={state.isWon ? handleContinue : undefined}
          />
        </div>

        <div className="mt-4 text-center text-[#776e65] text-sm">
          Moves: {state.moves} • Board: {state.boardSize}x{state.boardSize}
        </div>
      </div>
    </div>
  );
};