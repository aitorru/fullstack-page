import React, { Suspense } from "react";
import {
    Switch,
    Route
} from "react-router-dom";
const App = React.lazy(() => import("../Pages"))
const Login = React.lazy(() => import("../Pages/login"))

export default function CustomRouter() {
    return (
        <Switch>
            <Route exact path="/">
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </Route>
            <Route path="/login">
                <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                </Suspense>
            </Route>
        </Switch>
    )
}