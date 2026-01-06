const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const {  UserReward } = require('../models/index')

router.post(('/'), tokenExtractor, async (req, res) => {
    const userId = req.decodeToken.id
    const {rewardId} = req.body

    const checkUserRewards = await UserReward.findOne({
        where: {
            userId,
            rewardId
        }
    })

    if (checkUserRewards) {
        return res.status(400).json({ error: 'Reward already unlocked'})
    }

    const unlockReward = await UserReward.create({
        userId,
        rewardId
    })

    res.json(unlockReward)
})

module.exports = router