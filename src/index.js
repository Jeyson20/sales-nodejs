import app from "./app";
import pkg from "../package.json"
app.get('/', (req, res) => res.json({
    autor: pkg.author,
    version: pkg.version
}))
app.listen(app.get('port'), () => console.log(`server on port ${app.get('port')}`))