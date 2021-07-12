import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Header } from "./Header";
import { FourZeroFour } from "./pages/FourZeroFour";
import { AddEdition } from "./pages/AddEdition";
import { ManageEmails } from "./pages/ManageEmails";

export const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Home} exact />
          <Route path="/addedition" component={AddEdition} exact />
          <Route path="/manageemails" component={ManageEmails} exact />
          <Route path="*" component={FourZeroFour} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
