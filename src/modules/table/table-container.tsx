import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import Table from "./table";
import { actions } from "../../redux/table-reducer";
import { AppStateType } from "../../redux/store";
import { RowType, PayloadType } from "../../types/types";

type PropsTypes = {
  rows: Array<RowType>;
  addRow: (payload: PayloadType) => void;
  deleteRow: (rowId: number) => void;
  updateRow: (payload: PayloadType) => void;
};

const TableContainer = (props: any) => {
  let { id } = useParams();
  let userRows = [...props.rows];
  if (id) {
    userRows = [...props.rows.filter((row: RowType) => row.userName === id)];
  }
  return (
    <>
      <Table
        rows={userRows}
        addRow={props.addRow}
        deleteRow={props.deleteRow}
        updateRow={props.updateRow}
        id={id}
      />
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  rows: state.table.rows,
});

export default connect(mapStateToProps, {
  addRow: actions.addRow,
  deleteRow: actions.deleteRow,
  updateRow: actions.updateRow,
})(TableContainer);
