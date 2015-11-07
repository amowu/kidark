import express from 'express'

const router = express.Router()

router.route('/')
  .get((req, res, next) => {
    setTimeout(() => {
      res.status(200).send({users: [{
        id: '319',
        firstName: 'Sakura',
        lastName: 'Miyawaki'
      }, {
        id: '26',
        firstName: 'Amo',
        lastName: 'Wu'
      }]}).end()
    }, 50)
  })

export default router
