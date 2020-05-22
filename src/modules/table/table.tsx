import React, { useEffect } from "react";
import MaterialTable, { Column, MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";

import { RowType, PayloadType } from "../../types/types";

type TableState = {
  columns: Array<Column<RowType>>;
  data: Array<RowType>;
};
type ProprsTypes = {
  rows: Array<RowType>;
  id: string;
  addRow: (payload: PayloadType) => void;
  deleteRow: (rowId: number | undefined) => void;
  updateRow: (payload: PayloadType) => void;
};

const Table = (props: ProprsTypes) => {
  const uncomplitedTasks = props.rows.filter((task) => !task.status);
  const [state, setState] = React.useState<TableState>({
    columns: [],
    data: [],
  });
  useEffect(
    () =>
      setState({
        columns: [
          {
            title: "Статус",
            field: "status",
            type: "boolean",
            searchable: false,
          },
          {
            title: "Исполнитель",
            field: "userName",
            editable: "onAdd",
            searchable: false,
            render: (rowData) => (
              <Link to={`/${rowData.userName}`}>{rowData.userName}</Link>
            ),
          },
          { title: "Задача", field: "taskName" },
        ],
        data: [...props.rows],
      }),
    [props]
  );

  return (
    <MaterialTable
      title={`Незавершенных задач: ${uncomplitedTasks.length}`}
      localization={{
        toolbar: { searchPlaceholder: "Поиск по задачам" },
        header: { actions: "" },
      }}
      columns={state.columns}
      data={state.data}
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: "0px 10px" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Chip
                  label="К общему списку"
                  color="secondary"
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </div>
          </div>
        ),
      }}
      editable={{
        onRowAdd: (newData) =>
          // имитация POST запроса
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              props.addRow(newData);
              setState((prevState) => {
                const data = [...prevState.data];
                //data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: async (newData, oldData) => {
          // имитация PUT запроса
          await setTimeout(() => {
            if (oldData) {
              setState((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                props.updateRow(newData);
                return { ...prevState, data };
              });
            }
          }, 600);
        },
        onRowDelete: (oldData) =>
          // имитация DELETE запроса
          new Promise((resolve) => {
            setTimeout(() => {
              props.deleteRow(oldData.id);
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

export default Table;
