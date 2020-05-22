export type TaskType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  userName?: string;
};

export type PayloadType = {
  userName: string | undefined;
  taskName: string | undefined;
  status: boolean | undefined;
};

export type RowType = {
  id: number | undefined;
  status: boolean | undefined;
  userName: string | undefined;
  taskName: string | undefined;
};
