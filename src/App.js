import './App.css';

import React from "react";
import ClientPanel from './components/ClientPanel';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    // HashRouter,
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import TopBar from "./components/TopBar";
import HomePage from "./components/HomePage";
import Offer from "./components/Offer";
import Product from "./components/Product";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart/Cart";
import PrivateRoute from "./components/PrivateRoute";
import Transaction from "./components/Transaction";

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
