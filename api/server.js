const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('api/actions', actionsRouter)
server.use('api/projects', projectsRouter)

server.use('*', (req, res) => { // catch all
    res.status(404).send(`
      <h2>Lambda Sprint 1 API</h2>
      <p>Oops, can't find that!</p>
    `);
  });

server.use((err, req, res, next) => {
    console.log('err handling middleware kicking in!', err.message)
    res.status(err.status || 500).json({
      custom: 'something exploded inside the app',
      message: err.message,
      stack: err.stack,
    })
  });


module.exports = server;
