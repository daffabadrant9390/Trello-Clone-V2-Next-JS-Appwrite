export type PopupRemoveTodoCardState = {
  isOpen: boolean;
  todoItemIdx: number | null;
  todoData: Todo | null;
  columnId: ColumnType | null;
};

export type PopupEditTodoCardState = {
  isOpen: boolean;
  todoId: string | null;
  columnId: ColumnType | null;
  todoTitle: string | null;
  todoImage?: Image | null;
  todoImageUrl?: string | null;
  todoCreatedAt: string | null;
};
