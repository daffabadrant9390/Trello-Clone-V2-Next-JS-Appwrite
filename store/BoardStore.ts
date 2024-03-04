import { databases, storage } from '@/appwrite';
import { getTodosDataGroupedByColumnType } from '@/lib/helpers/getTodosDataGroupedByColumnType';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  inputSearchString: string;
  setInputSearchString: (searchString: string) => void;
  getBoardData: () => void;
  setBoard: (board: Board) => void;
  updateTodoItemStatusInDB: (todo: Todo, columnStatusId: ColumnType) => void;
  deleteTodoItem: ({
    todoItemIdx,
    todoData,
    columnId,
  }: {
    todoItemIdx: number;
    todoData: Todo;
    columnId: ColumnType;
  }) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },
  inputSearchString: '',
  setInputSearchString: (searchString: string) =>
    set({ inputSearchString: searchString }),
  getBoardData: async () => {
    const board = await getTodosDataGroupedByColumnType();
    set({ board });
  },
  setBoard: (board) => {
    set({ board });
  },
  updateTodoItemStatusInDB: async (todo, columnStatusId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnStatusId,
      }
    );
  },
  deleteTodoItem: async ({ todoItemIdx, todoData, columnId }) => {
    const newColumnMap = new Map(get().board.columns);

    // Delete the selected todoItemIdx from the specific column using columnId
    newColumnMap.get(columnId)?.todos.splice(todoItemIdx, 1);

    // Set the changes into board
    set({ board: { columns: newColumnMap } });

    if (!!todoData.image) {
      await storage.deleteFile(todoData.image.bucketId, todoData.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todoData.$id
    );
  },
}));
