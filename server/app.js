const MONGO_DB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.w3zpi.mongodb.net/${process.env.DB}`

const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
	next()
})
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

const authRoutes = require('./routes/auth')
const instructorRoutes = require('./routes/instructor')
const studentRoutes = require('./routes/student')
const userRoutes = require('./routes/user')

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/instructors', instructorRoutes)
app.use('/api/students', studentRoutes)
app.use((error, req, res, next) => {
	res.status(error.code || 500)
	res.json({ message: error.message || 'Unknown error occurred.' })
})

mongoose
	.connect(MONGO_DB_URI)
	.then((result) => {
		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}.`)
		})
	})
	.catch((err) => {
		console.log(err)
	})
