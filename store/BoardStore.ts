import { ID, databases, storage } from '@/appwrite';
import { getTodosDataGroupedByColumnType } from '@/lib/helpers/getTodosDataGroupedByColumnType';
import { uploadImage } from '@/lib/services/uploadImage';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  inputSearchString: string;
  setInputSearchString: (searchString: string) => void;
  newTaskInputText: string;
  setNewTaskInputText: (inputText: string) => void;
  newTaskType: ColumnType;
  setNewTaskType: (taskType: ColumnType) => void;
  newTaskImage: File | null;
  setNewTaskImage: (newImage: File | null) => void;
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
  addNewTodoItem: ({
    todoItemText,
    columnId,
    todoItemFileImage,
  }: {
    todoItemText: string;
    columnId: ColumnType;
    todoItemFileImage?: File | null;
  }) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },
  inputSearchString: '',
  setInputSearchString: (searchString: string) =>
    set({ inputSearchString: searchString }),
  newTaskInputText: '',
  setNewTaskInputText: (inputText: string) =>
    set({ newTaskInputText: inputText }),
  newTaskType: 'todo',
  setNewTaskType: (taskType: ColumnType) => set({ newTaskType: taskType }),
  newTaskImage: null,
  setNewTaskImage: (newImage: File | null) => set({ newTaskImage: newImage }),
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
  addNewTodoItem: async ({ todoItemText, columnId, todoItemFileImage }) => {
    let fileImage: Image | undefined;

    if (!!todoItemFileImage) {
      const uploadedFileImage = await uploadImage(todoItemFileImage);
      if (!!uploadedFileImage) {
        fileImage = {
          bucketId: uploadedFileImage.bucketId,
          fileId: uploadedFileImage.$id,
        };
      }
    }

    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todoItemText,
        status: columnId,
        // Only add image if exist
        ...(!!fileImage ? { image: JSON.stringify(fileImage) } : {}),
      }
    );

    // Update state from FE side
    set({ newTaskInputText: '' });
    set((state) => {
      const newColumnMap = new Map(state.board.columns);

      const newTodoItem: Todo = {
        $id: ID.unique(), //TODO: CHECK THE FUNCTIONALITY
        $createdAt: new Date().toISOString(),
        title: todoItemText,
        status: columnId,
        // Only add image if exist
        ...(!!fileImage ? { image: fileImage } : {}),
      };

      const selectedColumn = newColumnMap.get(columnId);

      // If the selected column is not exist, then create new one
      if (!selectedColumn) {
        newColumnMap.set(columnId, {
          id: columnId,
          todos: [newTodoItem],
        });
      } else {
        // If the selected column exist, push the todos array
        newColumnMap.get(columnId)?.todos.push(newTodoItem);
      }

      return {
        board: {
          columns: newColumnMap,
        },
      };
    });
  },
}));
