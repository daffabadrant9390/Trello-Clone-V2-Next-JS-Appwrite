interface Board {
  columns: Map<ColumnType, Column>;
}

type ColumnType = 'todo' | 'inprogress' | 'done';

interface Column {
  id: ColumnType;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: ColumnType;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
