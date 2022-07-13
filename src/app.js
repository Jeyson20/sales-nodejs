import express from "express";
import config from "./config";
import productsRoutes from './routes/products.routes'
import categoryRoutes from './routes/categories.routes'
import authRoutes from './routes/auth.routes'

const app = express()

//settings
app.set('port', config.port)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products',productsRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/auth',authRoutes)
export default app