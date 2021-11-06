import React, { Suspense } from "react";
import {
    Switch,
    Route
} from "react-router-dom";
const App = React.lazy(() => import("../Pages"))
const MoreNews = React.lazy(() => import("../Pages/moreNews"))
const Post = React.lazy(() => import("../Pages/post"))

export default function CustomRouter() {
    return (
        <Switch>
            <Route exact path="/">
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </Route>
            <Route path="/masNoticias">
                <Suspense fallback={<div>Loading...</div>}>
                    <MoreNews />
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