module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('user_rewards', {
      fields: ['user_id', 'reward_id'],
      type: 'unique',
      name: 'user_rewards_user_id_reward_id_unique'
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint(
      'user_rewards',
      'user_rewards_user_id_reward_id_unique'
    )
  }
}