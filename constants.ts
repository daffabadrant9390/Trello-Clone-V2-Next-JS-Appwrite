import PopupRemoveTodoCard from './components/Modal/PopupRemoveTodoCard';
import { PopupEditTodoCardState, PopupRemoveTodoCardState } from './lib/types';

export const DROPPABLE_TYPE = {
  COLUMN: 'column',
  CARD: 'card',
};

export const POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE: PopupRemoveTodoCardState =
  {
    isOpen: false,
    columnId: null,
    todoData: null,
    todoItemIdx: null,
  };

export const POPUP_EDIT_TODO_CARD_ITEM_DEFAULT_STATE: PopupEditTodoCardState = {
  isOpen: false,
  todoId: null,
  columnId: null,
  todoTitle: null,
  todoImage: null,
  todoImageUrl: null,
  todoCreatedAt: null,
};
