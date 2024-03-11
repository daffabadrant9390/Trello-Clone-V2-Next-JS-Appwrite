export type PopupRemoveTodoCardState = {
  isOpen: boolean;
  todoItemIdx: number | null;
  todoData: Todo | null;
  columnId: ColumnType | null;
};
