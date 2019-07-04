import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PublicTypeRoute from "./publics/public.type.route";

import LayoutComponent from "../component/layout/layout.component";
import LoadingComponent from "../component/progress/loader/loader.component";

import { GlobalContext } from "../context/global.context";
import { useOwnRedux } from "../context/global.store";

const Root: React.FC = () => {
  const { state, dispatch } = useOwnRedux();

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <LayoutComponent>
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <PublicTypeRoute />
          </Suspense>
        </Router>
      </LayoutComponent>
    </GlobalContext.Provider>
  );
};

export default Root;
