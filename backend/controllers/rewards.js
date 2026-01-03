const router = require('express').Router()
const { Reward } = require('../models/index')

router.get(('/'), async (req, res) => {
    const rewards = await Reward.findAll()
    res.json(rewards)
})

module.exports = router