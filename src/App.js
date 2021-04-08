import './App.css';

import React from "react";
import ClientPanel from './views/ClientPanel';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    // HashRouter,
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import TopBar from "./components/Navigation/TopBar";
import HomePage from "./views/HomePage";
import Offer from "./components/Offer";
import Product from "./views/Product";
import Login from "./views/Login";
import Register from "./views/Register";
import Cart from "./components/Cart/Cart";
import PrivateRoute from "./components/PrivateRoute";
import Transaction from "./views/Transaction";

function App() {
  return (
    <BrowserRouter>
        <TopBar />

        <Switch>
            <PrivateRoute path="/panel-klienta">
                <ClientPanel />
            </PrivateRoute>
            <PrivateRoute path="/transakcja">
                <Transaction />
            </PrivateRoute>
            <Route path="/logowanie">
                <Login />
            </Route>
            <Route path="/rejestracja">
                <Register />
            </Route>
            <Route path="/oferta">
                <Offer/>
            </Route>
            <Route path="/koszyk">
                <Cart/>
            </Route>
            <Route path="/produkt/:productId" render={(props) => <Product {...props} />} />
            <Route path="/">
                <HomePage/>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
