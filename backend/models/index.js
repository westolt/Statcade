const Game = require('./game')
const User = require('./user')
const Score = require('./score')
const Reward = require('./reward')
const UserReward = require('./user_reward')
const EquippedReward = require('./equipped_reward')

User.hasMany(Score)
Score.belongsTo(User)

Game.hasMany(Score)
Score.belongsTo(Game)

Game.hasMany(Reward)
Reward.belongsTo(Game)

User.belongsToMany(Reward, { through: UserReward, as: 'unlockedRewards' })
Reward.belongsToMany(User, { through: UserReward, as: 'usersUnlocked' })

User.hasMany(EquippedReward, { as: 'equippedRewards' })
EquippedReward.belongsTo(User)

Game.hasMany(EquippedReward, { as: 'equippedRewards' })
EquippedReward.belongsTo(Game)

Reward.hasMany(EquippedReward, { as: 'equippedRewards' })
EquippedReward.belongsTo(Reward)

module.exports = {
    Game, User, Score, Reward, UserReward, EquippedReward
}