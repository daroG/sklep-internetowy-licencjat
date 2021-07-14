import './App.css';

import React from 'react';
import ClientPanel from './views/ClientPanel';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'filepond/dist/filepond.min.css'

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import TopBar from './components/Navigation/TopBar';
import HomePage from './views/HomePage';
import Offer from './components/Offer';
import Product from './views/Product';
import Login from './views/Login';
import Register from './views/Register';
import Cart from './components/Cart/Cart';
import PrivateRoute from './components/PrivateRoute';
import Transaction from './views/Transaction';
import AdminPanel from './views/AdminPanel';
import Search from './views/Search';

function App() {
  return (
    <BrowserRouter>
        <TopBar />
        <Switch>
            <PrivateRoute path="/admin">
                <AdminPanel />
            </PrivateRoute>
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
            <Route exact path="/oferta">
                <Offer/>
            </Route>
            <Route path="/oferta/:section" render={(props) => <Offer {...props} />} />
            <Route path="/koszyk">
                <Cart/>
            </Route>
            <Route path="/produkt/:productId" render={(props) => <Product {...props} />} />
            <Route path="/szukaj/:phrase" render={(props) => <Search {...props} />} />
            <Route path="/">
                <HomePage/>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
