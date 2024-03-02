import { getTodosDataGroupedByColumnType } from '@/lib/helpers/getTodosDataGroupedByColumnType';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  getBoardData: () => void;
  setBoard: (board: Board) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },
  getBoardData: async () => {
    const board = await getTodosDataGroupedByColumnType();
    set({ board });
  },
  setBoard: (board) => {
    set({ board });
  },
}));
