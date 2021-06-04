// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()


router.get('/', (req, res, next) => {
    Projects.get()
    .then(allProjects => {
        if (allProjects) {
            res.status(200).json(allProjects)
        } else {
            res.status(404).json({
                message: 'Projects not found'
            })
        }
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
    .then(success => {
        if (success) {
            res.status(200).json(success)
        } else {
            res.status(404).json({
                message: 'Project with id not found'
            })
        }
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: "missing required info, either name or description."})
    } else {
        Projects.insert(req.body)
        .then(success => {
            res.status(201).json(success)
        })
        .catch(next)
    }
})

router.put('/:id', (req, res, next) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: "missing required info, either name or description."})
    } else {
        Projects.update(req.params.id, req.body)
        .then(success => {
            res.status(200).json(success)
        })
        .catch(next)
    }
})

router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
    .then(deleted => {
        if (deleted > 0) {
            res.status(200).json({ message: 'The adopter has been nuked' });
          } else {
            res.status(404).json({ message: 'The adopter could not be found' });
          }
    })
    .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

module.exports = router