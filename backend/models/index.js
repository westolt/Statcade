const Game = require('./game')
const User = require('./user')
const Score = require('./score')
const Reward = require('./reward')
const UserReward = require('./user_reward')
const EquippedReward = require('./equipped_reward')

User.hasMany(Score, { foreignKey: 'user_id' })
Score.belongsTo(User, { foreignKey: 'user_id' })

Game.hasMany(Score, { foreignKey: 'game_id' })
Score.belongsTo(Game, { foreignKey: 'game_id' })

Game.hasMany(Reward, { foreignKey: 'game_id' })
Reward.belongsTo(Game, { foreignKey: 'game_id' })

User.belongsToMany(Reward, { through: UserReward, as: 'unlockedRewards', foreignKey: 'user_id' })
Reward.belongsToMany(User, { through: UserReward, as: 'usersUnlocked', foreignKey: 'reward_id' })

User.hasMany(EquippedReward, { foreignKey: 'user_id', as: 'equippedRewards' })
EquippedReward.belongsTo(User, { foreignKey: 'user_id' })

Game.hasMany(EquippedReward, { foreignKey: 'game_id', as: 'equippedRewards' })
EquippedReward.belongsTo(Game, { foreignKey: 'game_id' })

Reward.hasMany(EquippedReward, { foreignKey: 'reward_id', as: 'equippedRewards' })
EquippedReward.belongsTo(Reward, { foreignKey: 'reward_id' })

module.exports = {
    Game, User, Score, Reward, UserReward, EquippedReward
}