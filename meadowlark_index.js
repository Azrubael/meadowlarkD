const express = require('express')
const ehbs = require('express-handlebars')
const fortune = require('./lib/fortune.js')

const app = express()

// const handlers = require('./lib/handlers.js')

// Настройка механизма представлений Handlebars
const hbs = ehbs.create({defaultLayout: 'main'})
app.engine('handlebars', hbs.engine) 
app.set('view engine', 'handlebars')

const port = process.env.PORT || 9001

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))
// for testing
// app.get('/', handlers.render('home'))


app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() })
})
// for testing
// app.get('/about', handlers.render('about'))

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
}) 
// for testing
// app.use(handlers.notFound)

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})
// for testing
// app.use(handlers.serverError)

app.listen(port, () => { console.log(
    `Express running on http://localhost:${port}; ` +
    `; press Ctrl+C to stop` )}
    )