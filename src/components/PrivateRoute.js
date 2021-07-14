import React, {useContext} from 'react';
import {MyContext} from "../Context";
import {Redirect, Route} from "react-router-dom";


function PrivateRoute({children, ...rest}) {
    const {rootState} = useContext(MyContext);

    return (
        <Route {...rest} render={({location}) => rootState.isAuthenticated ? (
            children
        ) : (
            <Redirect to={{
                pathname: "/logowanie",
                state: { from: location, info: "Aby tutaj przejść, należy się zalogować."}
            }}
            />
        )} />
    );
}

export default PrivateRoute;
