import { getTasks, getNames } from "./../api/api";
import { BaseThunkType, InferActionsTypes } from "./store";
import { TaskType, RowType } from "../types/types";

const GET_TASKS = "Table/GET_TASKS";
const SET_IS_LOADED = "Table/SET_IS_LOADED";
const GET_NAMES = "Table/GET_NAMES";
const GET_ROWS = "Table/GET_ROWS";
const ADD_ROW = "Table/ADD_ROW";
const DELETE_ROW = "Table/DELETE_ROW";
const UPDATE_ROW = "Table/UPDATE_ROW";

export type StateType = {
  tasks: Array<TaskType>;
  rows: Array<RowType>;
  isTasksLoaded: boolean;
};

const initialState: StateType = {
  tasks: [],
  rows: [],
  isTasksLoaded: false,
};

const tableReducer = (state = initialState, action: any): StateType => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: [...action.tasks],
      };
    case GET_ROWS:
      return {
        ...state,
        rows: [...action.rows],
      };
    case SET_IS_LOADED:
      return {
        ...state,
        isTasksLoaded: action.isLoaded,
      };
    case GET_NAMES:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          const selectedUser = action.payload.find(
            (user: { id: number }) => task.userId === user.id
          );
          return { ...task, userName: selectedUser.name };
        }),
      };
    case ADD_ROW:
      return {
        ...state,
        rows: [
          ...state.rows,
          {
            id: action.payload.id,
            status: action.payload.status,
            taskName: action.payload.taskName,
            userName: action.payload.userName,
          },
        ],
      };
    case DELETE_ROW:
      return {
        ...state,
        rows: [...state.rows.filter((row) => row.id !== action.taskId)],
      };
    case UPDATE_ROW:
      return {
        ...state,
        rows: [
          ...state.rows.map((row) => {
            if (row.id === action.payload.id) {
              return {
                ...row,
                status: action.payload.status,
                taskName: action.payload.taskName,
              };
            }
            return row;
          }),
        ],
      };
    default:
      return state;
  }
};

export const actions = {
  setIsLoaded: (isLoaded: boolean) =>
    ({ type: SET_IS_LOADED, isLoaded } as const),
  getTasks: (tasks: Array<TaskType>) => ({ type: GET_TASKS, tasks } as const),
  getNames: (payload: Array<{ id: number; name: string }>) => ({
    type: GET_NAMES,
    payload,
  }),
  getRows: (rows: Array<RowType>) => ({ type: GET_ROWS, rows } as const),
  addRow: (payload: any) => ({ type: ADD_ROW, payload } as const),
  deleteRow: (taskId: number) => ({ type: DELETE_ROW, taskId } as const),
  updateRow: (payload: any) => ({ type: UPDATE_ROW, payload } as const),
};

export const initThunk = (): ThunkType => async (dispatch, getState) => {
  const tasks = await getTasks();
  dispatch(actions.getTasks(tasks));

  const names = await getNames();
  dispatch(actions.getNames(names));

  const rows = getState().table.tasks.map((task) => ({
    id: task.id,
    status: task.completed,
    userName: task.userName,
    taskName: task.title,
  }));
  dispatch(actions.getRows(rows));
};

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
export default tableReducer;
