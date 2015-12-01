import express from 'express'

const router = express.Router()

router.route('/amowu')
  .get((req, res, next) => {
    setTimeout(() => {
      res.status(200).send({
        user: {
          id: '26',
          firstName: 'Amo',
          lastName: 'Wu'
        }
      }).end()
    }, 50)
  })

export default router
