const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { EquippedReward, UserReward } = require('../models/index')

router.get('/', async (req, res) => {
    const equipped_rewards = await EquippedReward.findAll()
    res.json(equipped_rewards)
})

router.delete('/', tokenExtractor,async (req, res) => {
    const userId = req.decodedToken.id
    const {slot, gameId} = req.body
    const deleted = await EquippedReward.destroy({
        where: {
        userId,
        slot,
        gameId,
        }
    })

    if (deleted === 0) {
        return res.status(404).json({ error: 'Equipped reward not found'})
    }

    res.end()
})

router.post('/', tokenExtractor, async (req, res) => {
    const userId = req.decodedToken.id

    if (!userId) {
        return res.status(400).json({ error: 'User not found'})
    }

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
        }
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