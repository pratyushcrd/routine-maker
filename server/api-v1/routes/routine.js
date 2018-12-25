const express = require('express')
const makeRoutine = require('../../../utils/routine-logic')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('You landed on /api/routine/')
})

/**
 * POST input data to get routine
 */
router.post('/make', (req, res) => {
  // res.send('You landed on /api/routine/ post')
  try {
    const input = JSON.parse(req.body.input)
    const routine = makeRoutine(input)
    res.send(routine)
  } catch (e) {
    console.log(e)
    res.send({
      error: String(e)
    })
  }
})

module.exports = router
