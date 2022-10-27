const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune.js')
const app = express()
const PORT = 9001;
const handlers = require('./lib/handlers.js')

// Настройка механизма представлений Handlebars
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
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

app.listen(PORT, () => console.log(
    `Express running on http://localhost:${PORT}; ` +
    `press Ctrl+C to stop` ))