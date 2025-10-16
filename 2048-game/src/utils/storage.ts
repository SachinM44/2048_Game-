const BEST_SCORE_KEY = 'bestScore';

export const loadBestScore = (): number => {
  try {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Failed to load best score:', error);
    return 0;
  }
};

export const saveBestScore = (score: number): void => {
  try {
    localStorage.setItem(BEST_SCORE_KEY, score.toString());
  } catch (error) {
    console.error('Failed to save best score:', error);
  }
};