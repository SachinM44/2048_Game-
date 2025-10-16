import React from 'react';
import { motion } from 'framer-motion';
import { WIN_TILE } from '../utils/constants';

interface GameOverlayProps {
  isWon: boolean;
  isGameOver: boolean;
  onRestart: () => void;
  onContinue?: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({
  isWon,
  isGameOver,
  onRestart,
  onContinue,
}) => {
  if (!isWon && !isGameOver) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-white bg-opacity-90 rounded flex flex-col items-center justify-center z-50"
    >
      <h2 className="text-5xl font-bold mb-4 text-[#776e65]">
        {isWon ? 'You Win!' : 'Game Over!'}
      </h2>
      <p className="text-xl mb-6 text-[#776e65]">
        {isWon ? `You reached ${WIN_TILE}!` : 'No more moves available'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-[#8f7a66] text-white rounded font-bold hover:bg-[#9f8a76] transition-colors"
        >
          Try Again
        </button>
        {isWon && onContinue && (
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-[#edc22e] text-white rounded font-bold hover:bg-[#edcc61] transition-colors"
          >
            Keep Playing
          </button>
        )}
      </div>
    </motion.div>
  );
};