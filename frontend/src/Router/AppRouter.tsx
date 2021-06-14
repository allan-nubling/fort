import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { IRoute, listedRoutes } from './RoutesList'

export default function AppRouter(): JSX.Element {
    const { path } = useRouteMatch()
    const routes = listedRoutes
    return (
        <Switch>
            <Route exact path="/app">
                <Redirect to={path + routes[0].path} />
            </Route>
            {routes.map((route: IRoute) => (
                <Route
                    path={path + route.path}
                    key={route.path}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}
