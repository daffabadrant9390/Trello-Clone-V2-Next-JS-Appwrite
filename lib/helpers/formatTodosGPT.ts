export const formatTodosGPT = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    console.log('map: ', map);
    map[key] = value.todos;
    return map;
  }, {} as { [key in ColumnType]: Todo[] });

  const flatArrayCount = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as ColumnType] = (value || []).length;
      return map;
    },
    {} as { [key in ColumnType]: number }
  );

  return flatArrayCount;
};
