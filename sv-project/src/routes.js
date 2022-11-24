import Home from "./routes/Home.svelte"
import About from "./routes/About.svelte"
import Info from "./routes/Info.svelte"
import Canvas from "./routes/Canvas.svelte"
import Notfound from "./routes/Notfound.svelte"
const routes = {
    '/':Home,
    '/About':About,
    '/Info':Info,
    '/Canvas':Canvas,
    '*':Notfound
}
export default routes
