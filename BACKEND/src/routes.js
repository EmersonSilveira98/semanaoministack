const express = require('express')
const routes = express.Router();

const OngController= require('./controlers/OngControle')
const incidentControlers= require('./controlers/incidentControler')
const Profilecontroler= require('./controlers/ProfileControler')
const Sessionontroler= require('./controlers/SessionControler')

routes.post('/sessions', Sessionontroler.create)
routes.get('/ongs', OngController.index) 
routes.post('/ongs', OngController.create)
routes.get('/profile', Profilecontroler.index)

routes.post('/incidents',incidentControlers.create)
routes.get('/incidents', incidentControlers.index)
routes.delete('/incidents/:id', incidentControlers.delete)

module.exports = routes;