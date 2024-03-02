import { databases } from '@/appwrite';

export const getTodosDataGroupedByColumnType = async () => {
  const fetchedData = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todosData = fetchedData?.documents || [];

  /**
   * Transforming the todosData -> Map<ColumnTypes, Column>
   */
  const transformedTodosColumns: Map<ColumnType, Column> = todosData.reduce(
    (acc, currentTodo) => {
      // If inside Map there is no todo.status, create the object
      if (!acc.get(currentTodo?.status || '')) {
        acc.set(currentTodo?.status || '', {
          id: currentTodo?.status || '',
          todos: [],
        });
      }

      // Push todo data inside todos array based on its status
      acc.get(currentTodo?.status)?.todos.push({
        $id: currentTodo?.$id,
        $createdAt: currentTodo?.$createdAt,
        title: currentTodo?.title || '',
        status: currentTodo?.status || '',
        ...(!!currentTodo?.image
          ? { image: JSON.parse(currentTodo.image) }
          : {}),
      });

      return acc;
    },
    new Map<ColumnType, Column>()
  );

  /**
   * Loop the transformedTodosColumn and make sure all the status
   * already added. If not, then create new key-value object for
   * the rest status
   */
  const columnTypes: ColumnType[] = ['todo', 'inprogress', 'done'];
  for (const columnType of columnTypes) {
    if (!transformedTodosColumns.get(columnType)) {
      transformedTodosColumns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  /**
   * Sort the transformedTodosColumn key to always sorted ascending
   * corresponding to the columnTypes
   */
  const sortedTodosColumns = new Map(
    Array.from(transformedTodosColumns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedTodosColumns,
  };

  return board;
};
