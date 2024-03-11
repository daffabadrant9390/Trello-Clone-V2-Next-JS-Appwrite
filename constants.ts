import PopupRemoveTodoCard from './components/Popup/PopupRemoveTodoCard';
import { PopupRemoveTodoCardState } from './lib/types';

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
