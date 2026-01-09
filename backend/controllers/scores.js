
const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { Score, User, Game, Reward, UserReward, EquippedReward } = require('../models/index')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const scores = await Score.findAll({
        include: [
        { 
            model: User,
            attributes: ['username'],
            include: [
                {
                    model: EquippedReward,
                    as: 'equippedRewards',
                    attributes: ['rewardId', 'slot', 'gameId']
                }
            ]
        },
        {
            model: Game,
            attributes: ['name']
        }
    ]
    })
    res.json(scores)
})

router.get('/game/:id', async (req, res) => {
    const scores = await Score.findAll({
        where: {
            gameId: req.params.id
        },
        order: [['score', 'DESC']],
        limit: 10,
        include: [
        { 
            model: User,
            attributes: ['username'],
            include: [
                {
                    model: EquippedReward,
                    as: 'equippedRewards',
                    attributes: ['rewardId', 'slot', 'gameId']
                }
            ]
        }
        ]
    })

    if (scores.length === 0) {
        return res.status(404).end()
    }

    res.json(scores)
})

router.post('/', tokenExtractor, async (req, res) => {
    const userId = req.decodedToken.id

    const { score, gameId } = req.body

    if (score === undefined || gameId === undefined){
        return res.status(400).json({ error: 'Missing score or gameId' })
    }

    const currentScore = await Score.findOne({
        where: { userId, gameId }
    })

    const rewards = await Reward.findAll({
        where: {
            gameId,
            required_score: { [Op.lte]: score }
        }
    })

    const unlocked = await UserReward.findAll({
        where: { userId }
    })
    const unlockedIds = unlocked.map(r => r.rewardId)

    const newRewards = rewards.filter(
        r => !unlockedIds.includes(r.id)
    )

    const created = await Promise.all(
        newRewards.map(r =>
            UserReward.create({ userId, rewardId: r.id })
        )
    )

    if (currentScore) {
        if (currentScore.score < score) {
            currentScore.score = score
            await currentScore.save()
        }
        res.json({
            score: currentScore,
            unlockedRewards: created
        })
    } else {
        const newScore = await Score.create({ score, userId, gameId })
        res.json({ score: newScore, unlockedRewards: created })
    }
})

module.exports = router