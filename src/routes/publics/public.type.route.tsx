import React from "react";
import { Route } from "react-router-dom";

import ListPublicRoutes from "./public.components.route";

const PublicRoute: React.FC = () => (
  <>
    {ListPublicRoutes.map((route, i) => (
      <Route key={i} {...route} />
    ))}
  </>
);

export default PublicRoute;
