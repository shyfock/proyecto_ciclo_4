import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../login/login';
import Register from '../register/register';
import PrivateRoute from '../auth/privateroute'

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path={['/', '/login']} component={Login}/>
                <PrivateRoute exact path='/home' component={Home}/>
                <Route exact path={'/register'} component={Register}/>
                <Route
                    path={'*'}
                    component={() => (
                        <h2 style={{ marginTop: 100}}>
                            404
                            <br/>
                            PÁGINA NO ENCONTRADA
                        </h2>
                    )}
                />
            </Switch>
        </Router>
    )
}

function Home() {
    return (
        <div>
            <h2 style={{ marginTop: 200 }}>Home</h2>
        </div>
    )
}
