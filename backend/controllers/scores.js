
const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { Score, User, Game } = require('../models/index')

router.get('/', async (req, res) => {
    const scores = await Score.findAll({
        include: [
        { 
            model: User,
            attributes: ['username'],
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
        }
        ]
    })

    if (scores.length === 0) {
        return res.status(404).end()
    }

    res.json(scores)
})

router.post('/', tokenExtractor, async (req, res) => {
    const decoded = req.decodedToken
    const userId = decoded.id

    const { score, gameId } = req.body

    if (score === undefined || gameId === undefined){
        return res.status(400).json({ error: 'Missing score or gameId' })
    }

    const current_score = await Score.findOne({
        where: { userId, gameId }
    })

    if (current_score) {
        if (current_score.score >= score) {
            res.json(current_score)
        } else {
            current_score.score = score
            await current_score.save()
            res.json(current_score)
        }
    } else {
        const newScore = await Score.create({
            score,
            userId,
            gameId
        })
        res.json(newScore)
    }
})

module.exports = router