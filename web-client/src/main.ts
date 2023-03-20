import * as Riot from "riot"
import App from "./components/app.riot"

const mountApp = Riot.component(App)

const target =  document.getElementById("root")
if (!target)
    throw "failed to get target element"

const app = mountApp(
    target,
    {
        message: "hello world",
        items:   [],
    },
)
