// Write your "actions" router here!
const express = require('express')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(next)
}) 


router.get('/:id', (req, res, next) => {
    Action.get(req.params.id)
    .then(success => {
        if (success){
            res.status(200).json(success)
        } else {
            res.status(404).json({
                message: 'action with id not found'
            })
        }
    })
    .catch(next)
}) 

router.post('/', (req, res, next) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ message: "missing required info, either id, notes or description."})
    } else {
        Action.insert(req.body)
        .then(success => {
            res.status(201).json(success)
        })
        .catch(next)
    }
})


router.put('/:id', (req, res, next) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ message: "missing required info, either name or description."})
    } else {
        Action.update(req.params.id, req.body)
        .then(success => {
            res.status(200).json(success)
        })
        .catch(next)
    }
})

router.delete('/:id', (req, res, next) => {
    Action.remove(req.params.id)
    .then(deleted => {
        if (deleted > 0) {
            res.status(200).json({ message: 'The action has been nuked' });
          } else {
            res.status(404).json({ message: 'The action could not be found' });
          }
    })
    .catch(next)
})


module.exports = router