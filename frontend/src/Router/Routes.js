import React, { Suspense } from "react";
import {
    Switch,
    Route
} from "react-router-dom";
const App = React.lazy(() => import("../Pages"))
const Login = React.lazy(() => import("../Pages/login"))
const Post = React.lazy(() => import("../Pages/post"))

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
            <Route path="/post/:id">
                <Suspense fallback={<div>Loading...</div>}>
                    <Post />
                </Suspense>
            </Route>
        </Switch>
    )
}