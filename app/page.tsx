'use client';

import Board from '@/components/Boards';
import Header from '@/components/Header';
import PopupRemoveTodoCard from '@/components/Modal/PopupRemoveTodoCard';
import PopupUpdateTodoCard from '@/components/Modal/PopupUpdateTodoCard';
import StateInformation from '@/components/StateInformation';
import {
  POPUP_EDIT_TODO_CARD_ITEM_DEFAULT_STATE,
  POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE,
} from '@/constants';
import { PopupEditTodoCardState, PopupRemoveTodoCardState } from '@/lib/types';
import { useCallback, useState } from 'react';

export default function Home() {
  const [popupRemoveTodoItemState, setPopupRemoveTodoItemState] =
    useState<PopupRemoveTodoCardState>(
      POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE
    );
  const [popupEditTodoItemState, setPopupEditTodoItemState] =
    useState<PopupEditTodoCardState>(POPUP_EDIT_TODO_CARD_ITEM_DEFAULT_STATE);

  const handleOpenPopupRemoveTodoItem = useCallback(
    ({ isOpen, columnId, todoData, todoItemIdx }: PopupRemoveTodoCardState) => {
      setPopupRemoveTodoItemState({
        isOpen: !!isOpen || true,
        columnId,
        todoData,
        todoItemIdx,
      });
    },
    []
  );

  const handleClosePopupRemoveTodoItem = useCallback(() => {
    setPopupRemoveTodoItemState(POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE);
  }, []);

  const handleOpenPopupEditTodoItem = useCallback(
    ({
      isOpen,
      todoId,
      columnId,
      todoTitle,
      todoImage,
      todoImageUrl,
      todoCreatedAt,
    }: PopupEditTodoCardState) => {
      setPopupEditTodoItemState({
        isOpen,
        todoId,
        columnId,
        todoTitle,
        todoImage,
        todoImageUrl,
        todoCreatedAt,
      });
    },
    []
  );

  const handleClosePopupEditTodoItem = useCallback(() => {
    setPopupEditTodoItemState(POPUP_EDIT_TODO_CARD_ITEM_DEFAULT_STATE);
  }, []);

  return (
    <>
      <Header />
      <main className="py-4 md:py-6">
        <StateInformation />
        <Board
          onUpdatePopupRemoveTodoItemState={handleOpenPopupRemoveTodoItem}
          onUpdatePopupEditTodoItemState={handleOpenPopupEditTodoItem}
        />
        <PopupRemoveTodoCard
          isOpen={!!popupRemoveTodoItemState.isOpen}
          todoData={popupRemoveTodoItemState.todoData || ({} as Todo)}
          columnId={popupRemoveTodoItemState.columnId || 'todo'}
          todoItemIdx={popupRemoveTodoItemState.todoItemIdx || 0}
          onClosePopupRemoveTodoItem={handleClosePopupRemoveTodoItem}
        />
        <PopupUpdateTodoCard
          isOpen={!!popupEditTodoItemState.isOpen}
          todoItemId={popupEditTodoItemState.todoId || ''}
          columnId={popupEditTodoItemState.columnId || 'todo'}
          todoTitle={popupEditTodoItemState.todoTitle || ''}
          todoImage={popupEditTodoItemState.todoImage}
          todoImageUrl={popupEditTodoItemState.todoImageUrl}
          onClosePopupEditTodoItem={handleClosePopupEditTodoItem}
          todoCreatedAt={popupEditTodoItemState.todoCreatedAt || ''}
        />
      </main>
    </>
  );
}
