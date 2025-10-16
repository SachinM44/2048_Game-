import React from 'react';
import { motion } from 'framer-motion';
import type { ITilesData } from '../core/types';
import { TILE_COLORS } from '../utils/constants';

interface TileProps {
  tile: ITilesData;
  boardSize: number;
}

export const Tile: React.FC<TileProps> = React.memo(({ tile, boardSize }) => {
  const colorClass = TILE_COLORS[tile.value] || 'bg-[#cdc1b4] text-white';
  const fontSize = tile.value > 512 ? 'text-2xl' : tile.value > 128 ? 'text-3xl' : 'text-4xl';
  
  const gapRem = 0.5;
  return (
    <motion.div
      layoutId={tile.id}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`absolute rounded ${colorClass} ${fontSize} font-bold flex items-center justify-center shadow-md`}
      style={{
        width: `calc((100% - ${(boardSize - 1) * gapRem}rem) / ${boardSize})`,
        height: `calc((100% - ${(boardSize - 1) * gapRem}rem) / ${boardSize})`,
        left: `calc(${tile.position.col} * (100% / ${boardSize} + ${gapRem / boardSize}rem))`,
        top: `calc(${tile.position.row} * (100% / ${boardSize} + ${gapRem / boardSize}rem))`,
      }}
    >
      {tile.value}
    </motion.div>
  );
});

Tile.displayName = 'Tile';