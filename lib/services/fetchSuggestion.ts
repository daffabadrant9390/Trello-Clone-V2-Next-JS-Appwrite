import { formatTodosGPT } from '../helpers/formatTodosGPT';

export const fetchSuggestion = async (board: Board) => {
  const formattedTodos = formatTodosGPT(board);

  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formattedTodos }),
  });

  const gptData = await response.json();
  const { content } = gptData || {};
  return content;
};
