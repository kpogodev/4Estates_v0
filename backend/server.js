import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import { requestLimiterAuth, requestLimiterProperties } from './config/requestLimiter.js'

//Routes
import auth from './routes/auth.js'
import profiles from './routes/profiles.js'
import properties from './routes/properties.js'
import rentals from './routes/rentals.js'
import sales from './routes/sales.js'
import users from './routes/users.js'

import { protect } from './middleware/auth.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())

app.use(express.urlencoded({ limit: '25mb', extended: true }))

//Body parser
app.use(express.json({ limit: '25mb' }))

//Sanitize body
app.use(mongoSanitize())

//Set security headers
app.use(helmet())

//Prevent XSS
app.use(xss())

//Prevent http param polution
app.use(hpp())

//Mount Routers
app.use('/api/v1/auth', requestLimiterAuth, auth)
app.use('/api/v1/profiles', requestLimiterAuth, profiles)
app.use('/api/v1/properties', requestLimiterProperties, properties)
app.use('/api/v1/rentals', rentals)
app.use('/api/v1/sales', sales)
app.use('/api/v1/users', users)

//Paypal Client Id Route
app.get('/api/v1/config/paypal', async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

//Custom Middlewares
app.use(notFound)
app.use(errorHandler)
app.use(protect)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} environment on port ${PORT}`))
