import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import { AppStateType } from "./redux/store";
import { actions, initThunk } from "./redux/table-reducer";
import { TaskType, RowType } from "./types/types";
import TableContainer from "./modules/table/table-container";
// const TableContainer = React.lazy(() =>
//   import("./modules/table/table-container")
// );

type ProprsTypes = {
  isLoaded: boolean;
  tasks: Array<TaskType>;
  rows: Array<RowType>;
  setIsLoaded: (isLoaded: boolean) => void;
  initThunk: () => Promise<any>;
};

const App = (props: ProprsTypes) => {
  useEffect(() => {
    (async function () {
      await props.initThunk();
      props.setIsLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {props.isLoaded ? (
        <Switch>
          <Route exact path={"/"} component={TableContainer}>
            {/* <Suspense fallback={<CircularProgress />}>
              <TableContainer />
            </Suspense> */}
          </Route>
          <Route exact path={"/:id"} component={TableContainer} />
        </Switch>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isLoaded: state.table.isTasksLoaded,
  tasks: state.table.tasks,
  rows: state.table.rows,
});

export default connect(mapStateToProps, {
  initThunk,
  setIsLoaded: actions.setIsLoaded,
})(App);
