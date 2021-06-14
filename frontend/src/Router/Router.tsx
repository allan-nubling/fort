import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import Login from '../views/Login/Login'
import Register from '../views/Register/Register'
import { useUser } from '../contexts/UserProvider/UserProvider'

export default function Router(): JSX.Element {
    const { user, load } = useUser()

    if (load) return <h6>...</h6>
    else
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {user?.id ? <Redirect to="/app" /> : <Login />}
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/app">
                        {user?.id ? <Layout /> : <Login />}
                    </Route>
                    <Route
                        path="*"
                        component={() => <span>Err: 404 - Page not found</span>}
                    />
                </Switch>
            </BrowserRouter>
        )
}
