const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { EquippedReward, User, UserReward } = require('../models/index')

router.get('/', async (req, res) => {
    const equipped_rewards = await EquippedReward.findAll()
    res.json(equipped_rewards)
})

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)

    if (!user) {
        return res.status(400).json({ error: 'User not found'})
    }

    const userId = user.id
    const { gameId, rewardId, slot } = req.body

    if (slot === 'USERNAME_FONT' && gameId !== null) {
        return res.status(400).json({ error: 'USERNAME_FONT does not have gameId!' })
    }

    if (slot === 'GAME_FONT' && gameId === null) {
        return res.status(400).json({ error: 'GAME_FONT requires gameId!' })
    }

    const unlocked = await UserReward.findOne({
        where: { userId, rewardId },
    })

    if (!unlocked) {
        return res.status(403).json({ error: 'Reward not unlocked' })
    }

    await EquippedReward.destroy({
        where: {
        userId,
        slot,
        gameId,
        },
    })

    const newEquip = await EquippedReward.create({
        userId,
        rewardId,
        slot,
        gameId,
    })

    res.json(newEquip)
})


module.exports = router