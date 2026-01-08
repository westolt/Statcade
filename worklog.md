# Work Log

|  Day  | Time (h) | Task                                                                                                                          |
| :---: | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| 29.10 | 3        | Design and prepare project                                                                                                    |
| 30.10 | 5        | Make components to Home page and update appearance                                                                            |
| 4.11  | 4        | Set up backend with Express and Sequelize, Neon PostgreSQL via Fly.io. Implement GET, POST and DELETE API endpoints for games |
| 5.11  | 1        | Structure backend into separate files                                                                                         |
| 6.11  | 2        | Add React Router for Play page navigation                                                                                     |
|       | 1        | Add game service to frontend using Axios and connect front end and back end with cors                                            |
|       | 2        | Deploy fullstack app to Fly.io                                                                                                |
| 10.11 | 5        | Learn how to add and run game on Statcade, including figuring out why it didn't display initially                            |
|       | 1        | Add `app.use('/static-games', express.static('games'))` to serve game files. Using the same technique as serving frontend static files, but with a different path |
|       | 1        | Edit Play page on frontend to display the game                                                                                |
| 13.11 | 1        | Improve frontend development environment (add proxy rule). Investigate issue with games not loading after refresh             |
|       | 3        | Study css (Flexbox) from YouTube. Refactor css files. Fix layout when using application on mobile                             |
| 17.11 | 3        | Study how to change text when hovering over a button. Credit to Bitfumes for the tutorial: [link](https://www.youtube.com/watch?v=GSHBhIqylxM). Implement hover-based game description in TextBox |
| 19.11 | 1        | Make header a link to Home page, add how_to_play column to games table and TextBox to Play page                               |
|       | 4        | Fix the issue where play page does not find the game after refreshing                                                         |
| 20.11 | 2        | Write backend tests for games API and set up initial test data with beforeEach                                                |
| 21.11 | 1        | Add frontend test for Text Box and fix CSS issues with gamebutton and gamelist                                                |
| 24.11 | 3        | Add e2e test folder, write tests for front page, game hover description, game opening and navigating from header              |
|       | 2        | Update Github actions CI workflow to include frontend, backend, and e2e tests. Add badges to README                           |
| 30.11 | 2        | Add user model, users controller, middleware and logger                                                                       |
| 7.12  | 2        | Add user registration functionality (frontend + backend) and add migrations for users, games and scores                       |
|       | 2        | Solve why user creation gave "malformatted id" errors in backend. This took more time than I'd like to admit, but I realised the issue was caused by using camelCase in migrations instead of snake_case. Fixed by changing passwordHash to password_hash in the migration                             |
|       | 2        | Implement login form and login logic                                                                                          |
| 10.12 | 4        | Add scores.js controller to submit and update user scores                                                                     |
|       | 3        | Save high score to the score table after finishing a game                                                                     |
|       | 2        | Add high score list to user box                                                                                               |
| 12.12 | 1        | Investigate why logging in is not possible in the production version. Solution: I had not set the SECRET variable in Fly.io   |
|       | 1        | Add profile_picture column to User model via migration                                                                        |
| 13.12 | 1        | Study how to upload a profile picture and delete the old image when uploading a new one for a user on Node, Sequelize, and React. Used these videos: [link1](https://www.youtube.com/watch?v=sVYrH166LXM) and [link2](https://www.youtube.com/watch?v=kcQWzRX37ag)|
|       | 2        | Add controller and PUT route for uploading profile pictures. Test with Postman to confirm uploads work                       |
|       | 2        | Investigate why new profile pictures are not showing in the application. Still have no idea, but will continue troubleshooting tomorrow |
| 14.12 | 2        | Fix the issue with displaying profile pictures by adding the missing static route proxy configuration to `vite.config.js`.    |
|       | 2        | Add ImageButton component and profile picture update functionality                                                                      |
|       | 4        | Fix token assignment on registration and correct old image deletion                                                           |
| 15.12 | 2        | Add score router for gameId in backend and add top 10 scoreboard to games    |
| 20.12 | 1        | Investigate how to upload profile pictures to cloud service. Add cloudinary.js util    |
| 21.12 | 4        | Learn more how to use Cloudinary. Followed this [tutorial](https://cloudinary.com/blog/guest_post/upload-images-to-cloudinary-with-node-js-and-react) from Cloudinary's website on how to upload images to Cloudinary using multer memoryStorage. Refactor image deletion. Remove static profile_pictures folder from backend and create profile_pictures and test folders in Cloudinary |
| 22.12 | 9        | Add unit tests to frontend and backend   |
| 23.12 | 2        | Separate prod, dev and test environments  |
|       | 2        | Add Stats.jsx that shows statistics. Got help from this [answer](https://stackoverflow.com/questions/77901322/javascript-current-time-not-getting-updated-in-react-js) from Stack overflow to set properly time for high scores |
|       | 3        | Refactor Stats.jsx and design how to display statistics  |
|       | 2        | Work with css  |
| 24.12 | 4        | Refactor and redesign User.jsx, improve top 10 scoreboard appearance, update font-family globally except in TextBox. |
| 25.12 | 2        | Design a new typing game integrated into Statcade. Repository: [TypingGame](https://github.com/westolt/TypingGame.git). Plan game mechanics and reward system. Statecade home page consists of two sections: games and rewards. User unlocks a special font by reaching a WPM goal. Investigate possible technologies and libraries. Start experimenting with JavaScript canvas |
|       | 2        | Experiment with JavaScript canvas. Discover that the <canvas> element does not support text wrapping well. Decide to switch to Phaser |
|       | 1        | Try working with Phaser. Realize that it requires too much learning and external help. Decide to implement the game with React instead  |
|       | 3        | Implement core game logic. Game randomly selects a paragraph from a JSON file. User can start typing and the timer starts counting down |
| 26.12 | 2        | Display paragraph and user input with colored feedback in Typer.jsx in [TypingGame](https://github.com/westolt/TypingGame.git) |
|       | 2        | Prevent player from typing past a wrong character |
|       | 2        | Prevent erasing correct words and clear input after a word is correctly typed |
|       | 1        | Add visible feedback for typos on empty space |
|       | 2        | Refactor Input component and add handleTyping function. Add WPM calculation when paragraph is completed |
| 27.12 | 2        | Add restart, random, and choose text buttons. Implement selection of specific paragraphs and reset functionality for current game in [TypingGame](https://github.com/westolt/TypingGame.git)|
|       | 2        | Display current WPM in real time while typing. Fix calculation formula and ensure WPM resets correctly when starting a new game |
|       | 2        | Add ability to save user score to backend via scoreService. Fix handleTyping logic to be compatible with async score submission. |
| 28.12 | 4        | Refactor message display, update registration view, redesign Top 10 scoreboard, and update Home page layout. Improve User.jsx, Login.jsx and Message.jsx styling and replace guest image |
| 2.1   | 2        | Learn how to create blinking cursor effect with CSS for [TypingGame](https://github.com/westolt/TypingGame.git). A [YouTube tutorial](https://www.youtube.com/watch?v=vsKYZj-XskI&t=1s) was helpful for understanding animations, but using border-left caused the cursor to collide with letters and shift them slightly. Solved this by switching to a ::after pseudo-element, which fixes the issue. Got help from this [video](https://www.youtube.com/watch?v=dIUOWdwwZBw) |
|       | 6        | Update Typing Game UI and improve typing flow by adding cursor. Add a thumbnail to TypingGame and adjust the homepage layout of UserBox, GameList, TextBox, and Statistics |
|  3.1  | 3        | Design how to implement award system to Statcade. Evaluate different data models and decide on many-to-many structure between users and rewards  |
|       | 2        | Add Reward model, migration, and controller, add many-to-many connection between User and Reward through UserReward  |
|  4.1  | 2        | Design equipped rewards system with focus on scalability. Discuss implementation ideas with ChatGPT. Decide to use unique constraints in equipped reward migration and slot ENUM in the model |
|       | 3        | Add equipped rewards migration, model, and controller. Add POST route to equip rewards (replacing previous equipment) and DELETE route to unequip rewards |
|       | 2        | Refactoring |
|  5.1  | 2        | Add more user data after login and registration using user id. Add getOne method to users service and fix failing user tests |
|       | 2        | Implement navigation bar and add logic to change username font when user has equipped USERNAME_FONT reward |
|       | 3        | Add RewardList and RewardButton components, add images and instructions to rewards, and refactor Home page component structure |
|       | 1        | Improve rewards UX by fixing reward order and adding hover effects to reward buttons |
|  6.1  | 2        | Handle unlocked rewards in RewardList and RewardButton components |
|       | 2        | Move user fetch logic to App.jsx and add equipped_rewards service |
|       | 3        | Add functionality to equip and unequip username font rewards. Refactor RewardList and RewardButton components and fix failing frontend tests |
|       | 2        | Implement reward unlock mechanism by adding user_rewards controller and service and frontend handleUnlock function |
|  7.1  | 3        | Re-evaluate reward unlock design. Initially planned to handle unlock checks in the frontend (App.jsx), which led to adding a user_rewards service on the previous day. After refactoring, move unlock logic to the backend score controller where score submission occurs. Implement reward unlock checks in score.js, remove unused user_rewards service and controller |
|       | 2        | Fix reward refresh issues after unlocking rewards. Got help from this [YouTube video](https://www.youtube.com/watch?v=r2_A3bh94fY). Add token handling to equipped rewards |
|       | 2        | Improve RewardButton UI and UX. Show reward checkbox only when the reward button is clicked. Add styling and glow effects to equipped reward buttons |
| total | 177      |                                                                                                                               |
